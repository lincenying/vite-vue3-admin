export interface Colors {
    name: string // 国际化版本请提供国际化字符串如：message.system.setting.style.default，非国际化版本直接写字符串，如：默认菜单风格
    menu: {
        textColor: string
        background: string
        childrenBackground: string
        hoverBackground: string
        submenuActiveColor: string
    }
    logo: {
        color: string
        background: string
    }
    header: {
        background: string
        textColor: string
        itemHoverColor: string
        breadcrumbTextColor: string
        borderColor: string
        tabBackground: string
    }
    container: {
        background: string
        mainBackground: string
    }
    page: {
        background: string
        color: string
        tipColor: string
        borderColor: string
    }
}

export interface Style {
    default: Colors
    light: Colors
    dark: Colors
    [propName: string]: Colors
}
