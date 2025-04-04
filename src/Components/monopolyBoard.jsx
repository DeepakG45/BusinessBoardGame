import React, { useState, useEffect } from "react"

const MonopolyBoard = () => {
  // Game constants
  const INITIAL_MONEY = 15000;
  const SALARY = 2000; // Money received when passing START

  // Define all properties with their details
  const allProperties = [
    { id: 0, name: "START", type: "corner", position: [0, 0] },
    { id: 1, name: "Red Fort", price: 2000, rent: 200, group: "green", position: [0, 1] },
    { id: 2, name: "CHANCE", type: "chance", position: [0, 2] },
    { id: 3, name: "Qutub Minar", price: 2200, rent: 220, group: "green", position: [0, 3] },
    { id: 4, name: "Income Tax", type: "tax", tax: 0.1, position: [0, 4] }, // 10% of player's money
    { id: 5, name: "Railway", price: 2500, rent: 250, group: "railway", position: [0, 5] },
    { id: 6, name: "India Gate", price: 2600, rent: 260, group: "pink", position: [0, 6] },
    { id: 7, name: "COMMUNITY", type: "community", position: [0, 7] },
    { id: 8, name: "Lotus Temple", price: 2800, rent: 280, group: "pink", position: [0, 8] },
    { id: 9, name: "Humayun Tomb", price: 3000, rent: 300, group: "pink", position: [0, 9] },
    { id: 10, name: "JAIL", type: "corner", position: [0, 10] },
    // Right side
    { id: 11, name: "Taj Mahal", price: 3200, rent: 320, group: "orange", position: [1, 10] },
    { id: 12, name: "Electric Co", price: 1500, rent: 150, group: "utility", position: [2, 10] },
    { id: 13, name: "Agra Fort", price: 3400, rent: 340, group: "orange", position: [3, 10] },
    { id: 14, name: "Railway", price: 2500, rent: 250, group: "railway", position: [4, 10] },
    { id: 15, name: "Fatehpur", price: 3600, rent: 360, group: "orange", position: [5, 10] },
    { id: 16, name: "CHANCE", type: "chance", position: [6, 10] },
    { id: 17, name: "Gateway", price: 3800, rent: 380, group: "red", position: [7, 10] },
    { id: 18, name: "Marine Drive", price: 4000, rent: 400, group: "red", position: [8, 10] },
    { id: 19, name: "CST Mumbai", price: 4200, rent: 420, group: "red", position: [9, 10] },
    // Bottom row
    { id: 20, name: "FREE PARKING", type: "corner", position: [10, 10] },
    { id: 21, name: "Konark Temple", price: 1800, rent: 180, group: "yellow", position: [10, 9] },
    { id: 22, name: "CHANCE", type: "chance", position: [10, 8] },
    { id: 23, name: "Ajanta Caves", price: 1600, rent: 160, group: "yellow", position: [10, 7] },
    { id: 24, name: "Ellora Caves", price: 1400, rent: 140, group: "yellow", position: [10, 6] },
    { id: 25, name: "Railway", price: 2500, rent: 250, group: "railway", position: [10, 5] },
    { id: 26, name: "Golden Temple", price: 1200, rent: 120, group: "blue", position: [10, 4] },
    { id: 27, name: "COMMUNITY", type: "community", position: [10, 3] },
    { id: 28, name: "Meenakshi", price: 1000, rent: 100, group: "blue", position: [10, 2] },
    { id: 29, name: "Khajuraho", price: 800, rent: 80, group: "blue", position: [10, 1] },
    { id: 30, name: "GO TO JAIL", type: "corner", position: [10, 0] },
    // Left side
    { id: 31, name: "Mysore Palace", price: 700, rent: 70, group: "teal", position: [9, 0] },
    { id: 32, name: "CHANCE", type: "chance", position: [8, 0] },
    { id: 33, name: "Hampi", price: 600, rent: 60, group: "teal", position: [7, 0] },
    { id: 34, name: "Railway", price: 2500, rent: 250, group: "railway", position: [6, 0] },
    { id: 35, name: "Golconda", price: 500, rent: 50, group: "teal", position: [5, 0] },
    { id: 36, name: "COMMUNITY", type: "community", position: [4, 0] },
    { id: 37, name: "Victoria", price: 400, rent: 40, group: "brown", position: [3, 0] },
    { id: 38, name: "Luxury Tax", type: "tax", tax: 1000, position: [2, 0] }, // Fixed 1000
    { id: 39, name: "Howrah", price: 200, rent: 20, group: "brown", position: [1, 0] },
  ];

  // Chance and Community Chest cards
  const chanceCards = [
    { text: "Advance to START, collect ₹2000", action: "moveToId", value: 0 },
    { text: "Advance to India Gate", action: "moveToId", value: 6 },
    { text: "Pay ₹500 for road repairs", action: "pay", value: 500 },
    { text: "Bank pays you dividend of ₹500", action: "receive", value: 500 },
    { text: "Get Out of Jail Free card", action: "jailCard", value: true },
    { text: "Go to JAIL", action: "moveToId", value: 10 },
    { text: "Advance to Taj Mahal", action: "moveToId", value: 11 },
    { text: "Pay each player ₹500", action: "payEach", value: 500 },
  ];

  const communityCards = [
    { text: "Bank error in your favor. Collect ₹2000", action: "receive", value: 2000 },
    { text: "Doctor's fee. Pay ₹500", action: "pay", value: 500 },
    { text: "Income tax refund. Collect ₹200", action: "receive", value: 200 },
    { text: "It's your birthday. Collect ₹500 from each player", action: "collectEach", value: 500 },
    { text: "Go to JAIL", action: "moveToId", value: 10 },
    { text: "Get Out of Jail Free card", action: "jailCard", value: true },
    { text: "Pay school fees of ₹1000", action: "pay", value: 1000 },
    { text: "Inherit ₹1000", action: "receive", value: 1000 },
  ];

  // Game state
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", emoji: "🚗", money: INITIAL_MONEY, position: 0, inJail: false, jailFreeCard: false },
    { id: 2, name: "Player 2", emoji: "🚀", money: INITIAL_MONEY, position: 0, inJail: false, jailFreeCard: false },
    { id: 3, name: "Player 3", emoji: "🎲", money: INITIAL_MONEY, position: 0, inJail: false, jailFreeCard: false },


    
    // Add more players as needed
  ]);
  
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [properties, setProperties] = useState(allProperties);
  const [gameLog, setGameLog] = useState(["Game started!"]);
  const [propertyOwnership, setPropertyOwnership] = useState({});
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [currentCard, setCurrentCard] = useState(null);
  const [gamePhase, setGamePhase] = useState("roll"); // roll, move, action, end

  const currentPlayer = players[currentPlayerIndex];

  // Roll dice function
  const rollDice = () => {
    if (gamePhase !== "roll") return;
    
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    setDice([die1, die2]);
    
    addToLog(`${currentPlayer.name} rolled ${die1 + die2} (${die1}, ${die2})`);
    setGamePhase("move");
    
    // Move player
    movePlayer(die1 + die2);
  };

  // Move player function
  const movePlayer = (steps) => {
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIndex];
    
    // Check if player is in jail
    if (player.inJail) {
      const isDouble = dice[0] === dice[1];
      
      if (isDouble || player.jailFreeCard) {
        if (player.jailFreeCard) {
          player.jailFreeCard = false;
          addToLog(`${player.name} used Get Out of Jail Free card`);
        } else {
          addToLog(`${player.name} rolled doubles and got out of jail`);
        }
        player.inJail = false;
      } else {
        addToLog(`${player.name} is still in jail`);
        setGamePhase("end");
        return;
      }
    }
    
    let newPosition = (player.position + steps) % 40;
    
    // Check if player passed START
    if (newPosition < player.position) {
      player.money += SALARY;
      addToLog(`${player.name} passed START and collected ₹${SALARY}`);
    }
    
    // Animate player movement
    const moveInterval = setInterval(() => {
      player.position = (player.position + 1) % 40;
      setPlayers([...newPlayers]);
      
      if (player.position === newPosition) {
        clearInterval(moveInterval);
        addToLog(`${player.name} moved to ${properties[newPosition].name}`);
        setGamePhase("action");
        
        // Handle landing on a property
        handleLanding(newPosition);
      }
    }, 200);
  };

  // Handle landing on a property
  const handleLanding = (position) => {
    const property = properties[position];
    
    // Handle different types of spaces
    if (property.type === "corner") {
      if (property.id === 30) { // Go to Jail
        sendToJail();
        return;
      }
      setGamePhase("end");
    } 
    else if (property.type === "chance") {
      drawCard("chance");
    } 
    else if (property.type === "community") {
      drawCard("community");
    } 
    else if (property.type === "tax") {
      payTax(property);
    } 
    else {
      // Regular property
      if (propertyOwnership[property.id]) {
        // Someone owns this property
        const ownerId = propertyOwnership[property.id];
        if (ownerId !== currentPlayer.id) {
          // Pay rent
          payRent(property, ownerId);
        } else {
          addToLog(`${currentPlayer.name} owns ${property.name}`);
          setGamePhase("end");
        }
      } else {
        // No one owns this property - offer to buy
        setShowBuyDialog(true);
      }
    }
  };

  // Draw a card function
  const drawCard = (type) => {
    const cards = type === "chance" ? chanceCards : communityCards;
    const card = cards[Math.floor(Math.random() * cards.length)];
    
    setCurrentCard(card);
    setShowCardDialog(true);
    addToLog(`${currentPlayer.name} drew a ${type} card: ${card.text}`);
  };

  // Handle card action
  const handleCardAction = () => {
    const card = currentCard;
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIndex];
    
    switch (card.action) {
      case "moveToId":
        const prevPosition = player.position;
        player.position = card.value;
        if (card.value < prevPosition && card.value !== 10) { // If not going to jail
          player.money += SALARY;
          addToLog(`${player.name} passed START and collected ₹${SALARY}`);
        }
        addToLog(`${player.name} moved to ${properties[card.value].name}`);
        break;
        
      case "pay":
        player.money -= card.value;
        addToLog(`${player.name} paid ₹${card.value}`);
        break;
        
      case "receive":
        player.money += card.value;
        addToLog(`${player.name} received ₹${card.value}`);
        break;
        
      case "jailCard":
        player.jailFreeCard = true;
        addToLog(`${player.name} received a Get Out of Jail Free card`);
        break;
        
      case "payEach":
        // Pay each other player
        for (let i = 0; i < newPlayers.length; i++) {
          if (i !== currentPlayerIndex) {
            newPlayers[i].money += card.value;
            player.money -= card.value;
            addToLog(`${player.name} paid ₹${card.value} to ${newPlayers[i].name}`);
          }
        }
        break;
        
      case "collectEach":
        // Collect from each player
        for (let i = 0; i < newPlayers.length; i++) {
          if (i !== currentPlayerIndex) {
            newPlayers[i].money -= card.value;
            player.money += card.value;
            addToLog(`${player.name} collected ₹${card.value} from ${newPlayers[i].name}`);
          }
        }
        break;
        
      default:
        break;
    }
    
    setPlayers(newPlayers);
    setShowCardDialog(false);
    setCurrentCard(null);
    
    // If card moved player, handle landing
    if (card.action === "moveToId") {
      handleLanding(player.position);
    } else {
      setGamePhase("end");
    }
  };

  // Send to jail function
  const sendToJail = () => {
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIndex];
    
    player.position = 10; // JAIL position
    player.inJail = true;
    
    setPlayers(newPlayers);
    addToLog(`${player.name} was sent to JAIL`);
    setGamePhase("end");
  };

  // Pay tax function
  const payTax = (property) => {
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIndex];
    
    let taxAmount;
    if (typeof property.tax === "number") {
      taxAmount = property.tax > 1 ? property.tax : Math.floor(player.money * property.tax);
    } else {
      taxAmount = 0;
    }
    
    player.money -= taxAmount;
    
    setPlayers(newPlayers);
    addToLog(`${player.name} paid ₹${taxAmount} in tax`);
    setGamePhase("end");
  };

  // Pay rent function
  const payRent = (property, ownerId) => {
    const newPlayers = [...players];
    const currentPlayer = newPlayers[currentPlayerIndex];
    const ownerIndex = newPlayers.findIndex(p => p.id === ownerId);
    
    if (ownerIndex !== -1) {
      const rentAmount = property.rent;
      currentPlayer.money -= rentAmount;
      newPlayers[ownerIndex].money += rentAmount;
      
      setPlayers(newPlayers);
      addToLog(`${currentPlayer.name} paid ₹${rentAmount} rent to ${newPlayers[ownerIndex].name}`);
    }
    
    setGamePhase("end");
    checkBankruptcy();
  };

  // Buy property function
  const buyProperty = () => {
    const property = properties[currentPlayer.position];
    const newPlayers = [...players];
    const player = newPlayers[currentPlayerIndex];
    
    if (player.money >= property.price) {
      player.money -= property.price;
      
      // Update property ownership
      setPropertyOwnership({
        ...propertyOwnership,
        [property.id]: player.id
      });
      
      setPlayers(newPlayers);
      addToLog(`${player.name} bought ${property.name} for ₹${property.price}`);
    } else {
      addToLog(`${player.name} couldn't afford ${property.name}`);
    }
    
    setShowBuyDialog(false);
    setGamePhase("end");
  };

  // Decline to buy property
  const declineBuy = () => {
    addToLog(`${currentPlayer.name} declined to buy ${properties[currentPlayer.position].name}`);
    setShowBuyDialog(false);
    setGamePhase("end");
  };

  // End turn function
  const endTurn = () => {
    if (gamePhase !== "end") return;
    
    // Check for bankruptcy at the end of turn
    if (!checkBankruptcy()) {
      // Move to next player
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      setGamePhase("roll");
      addToLog("--- Next turn ---");
    }
  };

  // Check for bankruptcy
  const checkBankruptcy = () => {
    const player = players[currentPlayerIndex];
    
    if (player.money < 0) {
      addToLog(`${player.name} is bankrupt and out of the game!`);
      
      // Remove player's properties
      const newPropertyOwnership = { ...propertyOwnership };
      for (const propId in newPropertyOwnership) {
        if (newPropertyOwnership[propId] === player.id) {
          delete newPropertyOwnership[propId];
        }
      }
      setPropertyOwnership(newPropertyOwnership);
      
      // Remove player from game
      const newPlayers = players.filter((p, i) => i !== currentPlayerIndex);
      setPlayers(newPlayers);
      
      // Check if game is over
      if (newPlayers.length === 1) {
        addToLog(`${newPlayers[0].name} wins the game!`);
      } else {
        setCurrentPlayerIndex(currentPlayerIndex % newPlayers.length);
        setGamePhase("roll");
      }
      
      return true;
    }
    
    return false;
  };

  // Add to game log
  const addToLog = (message) => {
    setGameLog(prevLog => [...prevLog, message]);
  };

  // Render player pieces on the board
  const renderPlayerPieces = (position) => {
    const playersOnThisPosition = players.filter(p => p.position === position);
    
    if (playersOnThisPosition.length === 0) return null;
    
    return (
      <div className="absolute bottom-1 right-1 flex">
        {playersOnThisPosition.map(player => (
          <div 
            key={player.id}
            className="w-8 h-8 mx-0.5 text-2xl"
          >
            {player.emoji}
          </div>
        ))}
      </div>
    );
  };

  // Find property owner
  const getPropertyOwner = (propertyId) => {
    const ownerId = propertyOwnership[propertyId];
    if (!ownerId) return null;
    
    return players.find(p => p.id === ownerId);
  };

  // Get color class for owner indicator
  const getOwnerColorClass = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'blue': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  // ... existing code ...

return (
  <div className="h-screen w-screen flex bg-amber-800 p-2">
    <div className="grid grid-cols-7 gap-2 w-full h-full">
      {/* Left sidebar - player info */}
      <div className="col-span-1 bg-amber-100 rounded-xl p-2 shadow-2xl border-4 border-amber-700">
        <h2 className="text-lg font-bold mb-2 text-amber-800 border-b-2 border-amber-700 pb-1">Players</h2>
        <div className="space-y-2">
          {players.map(player => (
            <div 
              key={player.id} 
              className={`p-2 rounded-lg transition-all duration-200 ${player.id === currentPlayer.id ? 
                'bg-amber-300 transform scale-105 shadow-md border-2 border-amber-600' : 
                'bg-white border border-amber-200'}`}
            >
              <div className="flex items-center">
                <div className="mr-2 text-2xl">{player.emoji}</div>
                <div className="flex-1 font-semibold text-gray-800 text-xs">{player.name}</div>
                <div className="font-bold text-xs">₹{player.money.toLocaleString()}</div>
              </div>
              {player.inJail && (
                <div className="mt-1 text-xs font-medium text-red-600 bg-red-100 px-1 py-0.5 rounded inline-block">
                  In Jail
                </div>
              )}
              {player.jailFreeCard && (
                <div className="mt-1 text-xs font-medium text-green-600 bg-green-100 px-1 py-0.5 rounded inline-block ml-1">
                  Jail Free Card
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Game controls */}
        <div className="mt-2">
          {gamePhase === "roll" && (
            <button 
              onClick={rollDice} 
              className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all duration-300"
            >
              Roll Dice
            </button>
          )}
          
          {gamePhase === "end" && (
            <button 
              onClick={endTurn} 
              className="w-full py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-sm shadow-lg transition-all duration-300"
            >
              End Turn
            </button>
          )}
          
          {/* Display dice */}
          {(gamePhase === "move" || gamePhase === "action" || gamePhase === "end") && (
            <div className="mt-2 p-2 bg-white rounded-lg border-2 border-amber-300">
              <h3 className="text-center font-bold text-amber-800 mb-1 text-xs">Dice Roll</h3>
              <div className="flex justify-center space-x-2">
                <div className="w-8 h-8 border-2 border-amber-700 rounded-lg bg-white flex items-center justify-center text-lg font-bold text-amber-800 shadow-inner">
                  {dice[0]}
                </div>
                <div className="w-8 h-8 border-2 border-amber-700 rounded-lg bg-white flex items-center justify-center text-lg font-bold text-amber-800 shadow-inner">
                  {dice[1]}
                </div>
              </div>
              <div className="text-center mt-1 font-bold text-xs text-amber-800">
                Total: {dice[0] + dice[1]}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Game board - UPDATED FOR 100% ZOOM */}
      <div className="col-span-5 h-full">
        <div className="grid grid-cols-11 grid-rows-11 border-4 border-amber-700 bg-amber-100 rounded-xl overflow-hidden shadow-2xl h-full">
          {/* Board cells - UPDATED FOR 100% ZOOM */}
          {properties.map(property => {
            const [row, col] = property.position;
            const style = {};
            
            // Calculate grid position
            if (row === 0) style.gridRow = 1;
            else if (row > 0 && row < 10) style.gridRow = row + 1;
            else style.gridRow = 11;
            
            if (col === 0) style.gridColumn = 1;
            else if (col > 0 && col < 10) style.gridColumn = col + 1;
            else style.gridColumn = 11;
            
            // Define background colors based on property type
            let bgColor = "bg-white";
            let borderColor = "";
            let textColor = "text-gray-800";
            
            // Color definitions remain the same, but borders are reduced from 8px to 4px
            if (property.type === "corner") {
              bgColor = "bg-amber-500";
              textColor = "text-white";
            }
            else if (property.type === "chance") {
              bgColor = "bg-gradient-to-br from-red-100 to-amber-100";
              textColor = "text-red-600";
            }
            else if (property.type === "community") {
              bgColor = "bg-gradient-to-br from-blue-100 to-amber-100";
              textColor = "text-blue-600";
            }
            else if (property.type === "tax") {
              bgColor = "bg-gradient-to-br from-blue-50 to-blue-100";
              textColor = "text-blue-800";
            }
            else if (property.group === "railway") {
              bgColor = "bg-gradient-to-br from-amber-100 to-amber-200";
              textColor = "text-amber-900";
            }
            else if (property.group === "utility") {
              bgColor = "bg-gradient-to-br from-blue-100 to-blue-200";
              textColor = "text-blue-900";
            }
            else if (property.group === "green") {
              bgColor = "bg-gradient-to-br from-green-500 to-green-600";
              textColor = "text-white";
              if (row === 0) borderColor = "border-t-4 border-t-green-700";
            }
            else if (property.group === "pink") {
              bgColor = "bg-gradient-to-br from-pink-500 to-pink-600";
              textColor = "text-white";
              if (row === 0) borderColor = "border-t-4 border-t-pink-700";
            }
            else if (property.group === "orange") {
              bgColor = "bg-gradient-to-br from-orange-500 to-orange-600";
              textColor = "text-white";
              if (col === 10) borderColor = "border-r-4 border-r-orange-700";
            }
            else if (property.group === "red") {
              bgColor = "bg-gradient-to-br from-red-500 to-red-600";
              textColor = "text-white";
              if (col === 10) borderColor = "border-r-4 border-r-red-700";
            }
            else if (property.group === "yellow") {
              bgColor = "bg-gradient-to-br from-yellow-400 to-yellow-500";
              textColor = "text-gray-800";
              if (row === 10) borderColor = "border-b-4 border-b-yellow-600";
            }
            else if (property.group === "blue") {
              bgColor = "bg-gradient-to-br from-blue-500 to-blue-600";
              textColor = "text-white";
              if (row === 10) borderColor = "border-b-4 border-b-blue-700";
            }
            else if (property.group === "teal") {
              bgColor = "bg-gradient-to-br from-teal-500 to-teal-600";
              textColor = "text-white";
              if (col === 0) borderColor = "border-l-4 border-l-teal-700";
            }
            else if (property.group === "brown") {
              bgColor = "bg-gradient-to-br from-amber-800 to-amber-900";
              textColor = "text-white";
              if (col === 0) borderColor = "border-l-4 border-l-amber-900";
            }
            
            const owner = getPropertyOwner(property.id);
            const isCurrentPosition = currentPlayer.position === property.id;
            const isCorner = property.type === "corner";
            
            return (
              <div
                key={property.id}
                style={style}
                className={`relative ${bgColor} ${borderColor} flex flex-col items-center justify-center border border-gray-400 ${isCorner ? 'p-1' : 'p-0.5'} overflow-hidden transition-all duration-200 ${isCurrentPosition ? 'ring-2 ring-yellow-400 z-10' : ''}`}
              >
                <div className={`font-bold text-center w-full ${isCorner ? 'text-xs' : 'text-xxs'} ${textColor} truncate`}>
                  {property.name}
                </div>
                
                {property.price && (
                  <div className={`mt-0.5 text-xxs ${textColor}`}>₹{property.price}</div>
                )}
                
                {owner && (
                  <div className={`absolute top-0.5 left-0.5 w-2 h-2 rounded-full ${owner.color === 'red' ? 'bg-red-500' : 'bg-blue-500'} border border-black`}></div>
                )}
                
                {renderPlayerPieces(property.id)}
              </div>
            );
          })}

            {/* Center area with Logo */}
            <div className="col-start-2 col-end-11 row-start-2 row-end-11 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center bg-amber-100 rounded-lg m-2">
                <div className="w-3/4 h-3/4 flex flex-col items-center justify-center">
                  <div className="w-48 h-48 rounded-full border-8 border-blue-600 flex items-center justify-center bg-white mb-6 shadow-lg">
                    <div className="text-3xl font-bold text-center text-blue-800">
                      INDIAN<br />BUSINESS<br />TOUR
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 w-full">
                    <div className="bg-gradient-to-br from-amber-300 to-amber-400 border-2 border-amber-600 p-2 rounded-lg text-center font-bold text-sm md:text-base shadow">
                      Taj Mahal
                    </div>
                    <div className="bg-gradient-to-br from-amber-300 to-amber-400 border-2 border-amber-600 p-2 rounded-lg text-center font-bold text-sm md:text-base shadow">
                      Red Fort
                    </div>
                    <div className="bg-gradient-to-br from-amber-300 to-amber-400 border-2 border-amber-600 p-2 rounded-lg text-center font-bold text-sm md:text-base shadow">
                      Gateway
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right sidebar - game log */}
        <div className="bg-amber-100 rounded-xl p-6 shadow-2xl border-4 border-amber-700 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-amber-800 border-b-2 border-amber-700 pb-2">Game Log</h2>
          <div className="space-y-2">
            {gameLog.map((log, index) => (
              <div 
                key={index} 
                className="text-sm p-2 bg-white rounded-lg border border-amber-200 shadow-sm"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Buy Property Dialog */}
      {showBuyDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl border-4 border-amber-600 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-3 text-amber-800">{properties[currentPlayer.position].name}</h2>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-amber-100 p-2 rounded-lg">
                <div className="text-sm font-medium text-amber-700">Price</div>
                <div className="font-bold">₹{properties[currentPlayer.position].price}</div>
              </div>
              <div className="bg-amber-100 p-2 rounded-lg">
                <div className="text-sm font-medium text-amber-700">Rent</div>
                <div className="font-bold">₹{properties[currentPlayer.position].rent}</div>
              </div>
            </div>
            <p className="mb-6 text-gray-700">Would you like to buy this property?</p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={declineBuy}
                className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition-colors duration-200"
              >
                No
              </button>
              <button 
                onClick={buyProperty}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-md transition-all duration-200"
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Card Dialog */}
      {showCardDialog && currentCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl border-4 border-amber-600 max-w-md w-full">
            <div className={`text-center p-4 mb-4 rounded-lg ${currentCard.action.includes('pay') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
              <h2 className="text-xl font-bold mb-2">Card Drawn</h2>
              <p className="text-lg font-medium">{currentCard.text}</p>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={handleCardAction}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-md transition-all duration-200"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonopolyBoard;