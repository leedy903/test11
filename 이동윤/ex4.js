function deepCopy(obj) {
    const map = new WeakMap();

    function _deepCopy(obj) {
        // null이나 객체가 아닌 타입(기본 자료형)은 그대로 반환
        if (obj === null || typeof obj !== "object") {
            return obj;
        }

        if (map.has(obj)) {
            return map.get(obj);
        }

        // Array일 경우 복사
        if (Array.isArray(obj)) {
            const arrCopy = [];
            map.set(obj, arrCopy);
            obj.forEach((value, index) => {
                arrCopy[index] = _deepCopy(value);
            });
            return arrCopy;
        }

        // Set 복사
        if (obj instanceof Set) {
            const setCopy = new Set();
            map.set(obj, setCopy);
            obj.forEach((value) => {
                setCopy.add(_deepCopy(value));
            });
            return setCopy;
        }

        // Map 복사
        if (obj instanceof Map) {
            const mapCopy = new Map();
            map.set(obj, mapCopy);
            obj.forEach((value, key) => {
                mapCopy.set(_deepCopy(key), _deepCopy(value));
            });
            return mapCopy;
        }

        // WeakSet, WeakMap는 빈 객체로 처리
        if (obj instanceof WeakSet) {
            return new WeakSet();
        }

        if (obj instanceof WeakMap) {
            return new WeakMap();
        }

        // 일반 객체 복사
        const objCopy = {};
        map.set(obj, objCopy);

        // 심볼과 일반 속성 복사
        Reflect.ownKeys(obj).forEach((key) => {
            objCopy[key] = _deepCopy(obj[key]);
        });

        return objCopy;
    }

    return _deepCopy(obj);
}

module.exports = { deepCopy };
