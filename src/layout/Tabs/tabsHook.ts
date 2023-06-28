/** 设置和拉取tab数据的主方法 */
const tabsHook = {
    setItem(arr: object[]) {
        localStorage.setItem('tabs', JSON.stringify(arr))
    },
    getItem() {
        return JSON.parse(localStorage.getItem('tabs') || '[]')
    },
}
export default tabsHook
