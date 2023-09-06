use neon::prelude::*;
extern crate jsonwebtoken as jwt;
use serde::{Serialize, Deserialize};
use jsonwebtoken::{encode, decode, Header, Validation, EncodingKey, DecodingKey};

/// Our claims struct, it needs to derive `Serialize` and/or `Deserialize`
#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    id: i32,
    name: String,
    email: String,
    exp: usize,
}

fn encode_jwt<T>(jwt_secret: String) -> impl Fn(CallContext<'_, JsObject>) -> Result<Handle<'_, JsString>, T> {
    return move |mut cx: FunctionContext| {
            let claims = cx.argument::<JsObject>(0)
        .unwrap();

        let name: Handle<JsValue> = claims.get(&mut cx, "name").unwrap();
        let email: Handle<JsValue> = claims.get(&mut cx, "email").unwrap();
        let id: Handle<JsValue> = claims.get(&mut cx, "id").unwrap();

        let rust_claims = Claims{
            id: id.to_string(&mut cx).unwrap().value(&mut cx).parse::<i32>().unwrap(),
            name: name.to_string(&mut cx).unwrap().value(&mut cx),
            email: email.to_string(&mut cx).unwrap().value(&mut cx),
            exp: (chrono::Utc::now() + chrono::Duration::minutes(1200)).timestamp() as usize,
        }; 

        let token = encode(&Header::default(), &rust_claims, 
            &EncodingKey::from_secret(jwt_secret.as_ref()));

        Ok(cx.string(token.unwrap()))
    }
}

fn decode_jwt<T>(jwt_secret: String) -> impl Fn(CallContext<'_, JsObject>) -> Result<Handle<'_, JsObject>, T> {
    return move |mut cx: FunctionContext| {
        let jwt_token = cx.argument::<JsString>(0).unwrap()
        .value(&mut cx);

    let parse_res = match decode::<Claims>(jwt_token.as_str(), 
        &DecodingKey::from_secret(jwt_secret.as_ref()),
         &Validation::default()) {
            Ok(res) => res,
            Err(_e) => return Ok(cx.empty_object()),
         };

    let token = parse_res.claims;

    if token.exp < chrono::Utc::now().timestamp() as usize {
        Ok(cx.empty_object())
    } else {
        let res: Handle<'_, JsObject> = cx.empty_object();

        let id = cx.number(token.id);
        let name = cx.string(token.name);
        let email = cx.string(token.email);

        res.set(&mut cx, "id", id).unwrap();
        res.set(&mut cx, "name", name).unwrap();
        res.set(&mut cx, "email", email).unwrap();

        Ok(res)
    }
    };
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    let jwt_secret = std::env::var("JWT_SECRET").expect("JWT_TOKEN must be set.");
    let jwt_copy = jwt_secret.clone();
    cx.export_function("encodeJwt", encode_jwt(jwt_secret))?;
    cx.export_function("decodeJwt", decode_jwt(jwt_copy))?;
    Ok(())
}
