const ShuffleArr = (arr) => {
    const result = [...arr,...arr];
    result.sort(() => Math.random() - 0.5);
    return  result;
}
export default ShuffleArr;