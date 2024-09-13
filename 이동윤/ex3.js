Array.prototype.sortBy = function (sortProp = "") {
    const properties = sortProp.split(",");
    console.log(properties);

    for (const property of properties) {
        console.log(property.split(":"));
    }

    return this.sort((a, b) => {
        for (const property of properties) {
            [column, order] = property.split(":");

            if (order === undefined || order === "" || order === "asc") {
                if (a[column] > b[column]) return 1;
                else if (a[column] < b[column]) return -1;
            } else if (order === "desc") {
                if (a[column] > b[column]) return -1;
                else if (a[column] < b[column]) return 1;
            }
        }
        return 0;
    });
};

const hong = { id: 1, name: "Hong", city: "Busan", dept: 1 };
const kim = { id: 2, name: "Kim", city: "Seoul", dept: 2 };
const lee = { id: 3, name: "Lee", city: "Daegu", dept: 2 };
const users = [lee, hong, kim];
