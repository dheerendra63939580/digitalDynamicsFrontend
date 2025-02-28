import Card from "./Card"
export function ShowEmpty({children}) {
    return(
    <Card classes="px-4 py-2 text-lg">
        {children}
    </Card>
    )
}