export const randTime = <T>(val: T): Promise<T> =>
    new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(promises: Promise<T>[]) {
    return Promise.all(
        promises.map((promise) =>
            Promise.resolve(promise)
                .then((value) => ({
                    status: "fulfilled",
                    value,
                }))
                .catch((reason) => ({
                    status: "rejected",
                    reason,
                }))
        )
    );
}
