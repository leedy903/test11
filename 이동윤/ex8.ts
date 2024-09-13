// debounce 함수 (delay 동안 마지막 호출만 실행)
const debounce = (cb: (arg: number) => void, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (i: number) => {
        if (timeoutId !== null) clearTimeout(timeoutId); // 기존 타이머를 초기화
        timeoutId = setTimeout(() => cb(i), delay); // 새로운 타이머 설정
    };
};

// throttle 함수 (delay 동안 첫 번째 호출만 실행)
const throttle = (cb: (arg: number) => void, delay: number) => {
    let lastExecTime = 0;

    return (i: number) => {
        const now = Date.now(); // 현재 시간

        // 마지막 실행 후 delay 시간이 지났으면 다시 실행
        if (now - lastExecTime >= delay) {
            cb(i);
            lastExecTime = now; // 마지막 실행 시간을 현재 시간으로 갱신
        }
    };
};

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
