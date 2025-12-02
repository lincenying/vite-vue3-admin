/**
 * 使用HSL颜色空间进行更自然的调整
 * @param hex HEX颜色值
 * @param lightness 亮度调整（-100到100）
 * @returns 调整后的HEX颜色值
 */
export function adjustHexColorHSL(hex: string, lightness: number): string {
    const cleanHex = hex.replace(/^#/, '')

    // 确保lightness在有效范围内
    const validLightness = Math.max(-100, Math.min(100, lightness))

    // 处理3位HEX格式
    let fullHex = cleanHex
    if (cleanHex.length === 3) {
        fullHex = cleanHex
            .split('')
            .map(char => char + char)
            .join('')
    }

    // 验证是否为有效的6位HEX
    if (!/^[0-9A-F]{6}$/i.test(fullHex)) {
        throw new Error('无效的HEX颜色格式')
    }

    // 将HEX转换为RGB
    const r = Number.parseInt(fullHex.substring(0, 2), 16) / 255
    const g = Number.parseInt(fullHex.substring(2, 4), 16) / 255
    const b = Number.parseInt(fullHex.substring(4, 6), 16) / 255

    // 转换为HSL
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    let l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }

    // 调整亮度
    l = Math.max(0, Math.min(1, l + (validLightness / 100)))

    // 将HSL转换回RGB
    const hue2rgb = (p: number, q: number, t: number): number => {
        if (t < 0)
            t += 1
        if (t > 1)
            t -= 1
        if (t < 1 / 6)
            return p + (q - p) * 6 * t
        if (t < 1 / 2)
            return q
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6
        return p
    }

    let r2 = l
    let g2 = l
    let b2 = l

    if (s !== 0) {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r2 = hue2rgb(p, q, h + 1 / 3)
        g2 = hue2rgb(p, q, h)
        b2 = hue2rgb(p, q, h - 1 / 3)
    }

    // 将RGB转换回HEX
    const toHex = (color: number): string => {
        const hex = Math.round(color * 255).toString(16)
        return hex.length === 1 ? `0${hex}` : hex
    }

    return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`
}
