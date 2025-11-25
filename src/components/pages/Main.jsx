import Search from '../notes/Search';
import Notes from '../notes/List';

function Main({ onOpenSort, isSortActive }) {
    return (
        <>
            <Search type="mobile" onOpenSort={onOpenSort} isSortActive={isSortActive} />
            <Notes />
        </>
    )
}

export default Main