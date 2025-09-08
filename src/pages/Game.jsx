import React from "react";
import {Board} from "../components/Board";


export default function Game() {
    return (
        <main style = {{padding: 16}}>
            <h1>Game Board</h1>

            <section aria-label="Game board" style={{marginTop: 12}}>
                {/* if props are needed later, add them here */}    
                <Board />
            </section>
        </main>
    )
}
    