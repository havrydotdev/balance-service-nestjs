const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new Error();
  } catch (error: unknown) {
    return error as TError;
  }
};

export default getError;
