import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onGameModeChange, onDifficultyChange, onStartGame, onRestart, onHome }) => {
  const [gameMode, setGameMode] = useState('2-player');
  const [difficulty, setDifficulty] = useState('NORMAL');
  const navigate = useNavigate();

  const handleGameModeChange = (mode) => {
    setGameMode(mode);
    if (onGameModeChange) onGameModeChange(mode);
  };

  const handleDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    setDifficulty(newDifficulty);
    if (onDifficultyChange) onDifficultyChange(newDifficulty);
  };

  const handleStartGame = () => {
    if (onStartGame) {
      onStartGame();
    } else {
      navigate('/game/room1');
    }
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      navigate('/');
    }
  };

  return (
    <aside className="card soft-border sidebar">
      <div className="group">
        <div className="label">Spelläge</div>
        <div className="segment">
          <button 
            className={`seg-btn ${gameMode === '2-player' ? 'active' : ''}`}
            onClick={() => handleGameModeChange('2-player')}
          >
            2 spelare
          </button>
          <button 
            className={`seg-btn ${gameMode === 'vs-bot' ? 'active' : ''}`}
            onClick={() => handleGameModeChange('vs-bot')}
          >
            Mot bot
          </button>
        </div>
      </div>

      <div className="group">
        <div className="label">AI-svårighet</div>
        <div className="select">
          <span>AI:</span>
          <select value={difficulty} onChange={handleDifficultyChange}>
            <option>LÄTT</option>
            <option>NORMAL</option>
            <option>SVÅR</option>
          </select>
        </div>
      </div>

      <div className="group actions">
        <button className="btn" onClick={handleStartGame}>
          Starta parti
        </button>
        <button className="btn-ghost" onClick={onRestart}>
          <span className="txt">Ångra drag</span>
        </button>
        <button className="btn-ghost" onClick={onRestart}>
          <span className="txt">Återställ</span>
        </button>
        <button className="btn-ghost" onClick={handleHome}>
          <span className="txt">Hem</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;