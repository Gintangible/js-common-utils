/**
 * 判断当前是否处于iOS操作系统中。
 */
export default function isIos() {
    const agent = navigator.userAgent.toLowerCase();
    if ((agent.indexOf('iphone') !== -1) || (agent.indexOf('ipad') !== -1)) {
        return true;
    } else {
        return false;
    }
};
