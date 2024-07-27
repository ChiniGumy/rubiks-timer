function Scramble() {

    const moves = [
        'U', "U'", 'U2',
        'D', "D'", 'D2',
        'R', "R'", 'R2',
        'L', "L'", 'L2',
        'F', "F'", 'F2',
        'B', "B'", 'B2'
    ];

    function getRandomMove(previousMove, previousPreviousMove) {
        let filteredMoves = moves.slice();

        if (previousMove) {
            const oppositeMove = previousMove.endsWith("'") ? previousMove.slice(0, -1) : previousMove + "'";
            filteredMoves = filteredMoves.filter(move => move !== oppositeMove && move !== previousMove);

            if (previousMove.startsWith('L') || previousMove.startsWith('R')) {
                filteredMoves = filteredMoves.filter(move => !move.startsWith('L') && !move.startsWith('R'));
            } else if (previousMove.startsWith('U') || previousMove.startsWith('D')) {
                filteredMoves = filteredMoves.filter(move => !move.startsWith('U') && !move.startsWith('D'));
            } else if (previousMove.startsWith('F') || previousMove.startsWith('B')) {
                filteredMoves = filteredMoves.filter(move => !move.startsWith('F') && !move.startsWith('B'));
            }
        }

        if (previousPreviousMove) {
            const sameLayerMoves = filteredMoves.filter(move => move[0] === previousPreviousMove[0]);
            if (sameLayerMoves.length > 0) {
                filteredMoves = filteredMoves.filter(move => !sameLayerMoves.includes(move));
            }
        }

        const randomIndex = Math.floor(Math.random() * filteredMoves.length);
        return filteredMoves[randomIndex];
    }

    function generateSequence(length) {
        let sequence = [];
        let previousMove = null;
        let previousPreviousMove = null;

        for (let i = 0; i < length; i++) {
            const randomMove = getRandomMove(previousMove, previousPreviousMove);
            sequence.push(randomMove);
            previousPreviousMove = previousMove;
            previousMove = randomMove;
        }

        return sequence.join(' ');
    }

    // Genera una secuencia larga que usa la mayoría de los movimientos disponibles
    const sequenceLength = 20;  // Ajusta la longitud según sea necesario
    const sequence = generateSequence(sequenceLength);

    return (
        <div className="bg-[#2D2F31] text-[#99A1AB] text-lg font-mono py-2 px-4 rounded-[8px]">
            <h1>
                {sequence}
            </h1>
        </div>
    );
}

export default Scramble;
