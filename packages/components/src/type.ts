import { CSSProperties } from "vue";

interface ShowOptionsProps {
    showLeft?: boolean,
    showRight?: boolean,
    showTop?: boolean,
    showBottom?: boolean,
    showTopLeft?: boolean,
    showTopRight?: boolean,
    showBottomLeft?: boolean,
    showBottomRight?: boolean,
}
interface StyleOptionsProps {
    componentStyle?: CSSProperties,
    topStyle?: CSSProperties,
    leftStyle?: CSSProperties,
    bottomStyle?: CSSProperties,
    rightStyle?: CSSProperties,
    height?: number,
    width?: number,
    top?: number,
    left?: number,
}

export type defaultProps = ShowOptionsProps & StyleOptionsProps & {
    labelKey?: string,
    canDragSquare?: boolean,
    containerIndex?: number,
}