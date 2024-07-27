import DnfButton from '../components/DnfButton';
import PlusTwoButton from '../components/PlusTwoButton';
import DeleteSolveButton from '../components/DeleteSolveButton';

function Buttons() {
    return (
        <div className='flex items-center mt-8'>
            <DnfButton />
            <PlusTwoButton />
            <DeleteSolveButton />    
        </div>
    );
}

export default Buttons;