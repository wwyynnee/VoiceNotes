import Search from '../notes/Search';
import Notes from '../notes/List';
import Sort from '../modals/Sort'

function Main() {
    return (
        <>
            <Search type="mobile" />
            <Notes />
            <Sort />
        </>
    )
}

export default Main