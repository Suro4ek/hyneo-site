const Tab = ({id,name, current, onClick}:any) => {
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }
    return(
        <li className={classNames(current ? "text-green-500 border-green-500" : "", "cursor-pointer py-2 px-4 text-gray-500 dark:text-gray-200 border-b-8")} onClick={() => onClick(id)}>
            {name}
        </li>
    )
}

export default Tab;