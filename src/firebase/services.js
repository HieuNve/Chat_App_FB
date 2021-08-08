import  firebase ,{db} from "./config";

export const addDocument =(collecttion, data)=>{
    const query = db.collection(collecttion);

    // tìm kiếm
    /**
     * db: bảng user
     * {
     * ngườu dùng nhập : "hie"
     * => Kiểm tra cái chuỗi người dùng nhập cps trùng với trong key hay không
     *     name : hieu nguyen => đưa vào 1 array với 2 phần tư [hieu, nguyen]  => hoán vị tất cả các trường hợp
     *     vd: [hieu, nguyen] , [nguyen , hieu] ...
     *     taachs key
     *     key: ["h", "hi", "hie" , "hieu", ...........]
     * }
     *
     */

    query.add({
        ...data,
        createAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName) => {
    // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
    // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
    const name = displayName.split(' ').filter((word) => word);

    const length = name.length;
    let flagArray = [];
    let result = [];
    let stringArray = [];

    /**
     * khoi tao mang flag false
     * dung de danh dau xem gia tri
     * tai vi tri nay da duoc su dung
     * hay chua
     **/
    for (let i = 0; i < length; i++) {
        flagArray[i] = false;
    }

    const createKeywords = (name) => {
        const arrName = [];
        let curName = '';
        name.split('').forEach((letter) => {
            curName += letter;
            arrName.push(curName);
        });
        return arrName;
    };

    function findPermutation(k) {
        for (let i = 0; i < length; i++) {
            if (!flagArray[i]) {
                flagArray[i] = true;
                result[k] = name[i];

                if (k === length - 1) {
                    stringArray.push(result.join(' '));
                }

                findPermutation(k + 1);
                flagArray[i] = false;
            }
        }
    }

    findPermutation(0);

    const keywords = stringArray.reduce((acc, cur) => {
        const words = createKeywords(cur);
        return [...acc, ...words];
    }, []);

    return keywords;
};