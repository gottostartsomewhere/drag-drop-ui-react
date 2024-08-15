import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Text, Group, Line, Image } from 'react-konva';
import Header from './components/Header'; 
import Modal from './components/Modal'; 

const App = () => {
  const [cards, setCards] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connectMode, setConnectMode] = useState(false);
  const [startCardId, setStartCardId] = useState(null);
  const [editableCardId, setEditableCardId] = useState(null);
  const [cardText, setCardText] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editorPosition, setEditorPosition] = useState({ x: 0, y: 0 });

  const stageRef = useRef(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  useEffect(() => {
    
    const img = new window.Image();
    img.src = 'path_to_your_background_image.jpg'; // Update with the path to your background image
    img.onload = () => {
      setBackgroundImage(img);
    };
  }, []);

  const addCard = () => {
    const newCard = {
      id: cards.length,
      text: 'This is some dummy text. Click show more to see more details.',
      x: Math.random() * 500,
      y: Math.random() * 300,
      width: 200,
      height: 100,
    };
    setCards([...cards, newCard]);
  };

  const updateCardPosition = (id, newX, newY) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, x: newX, y: newY };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const connectCards = (card1Id, card2Id) => {
    if (card1Id !== card2Id) {
      setConnections([...connections, { start: card1Id, end: card2Id }]);
    }
  };

  const toggleConnectMode = () => {
    setConnectMode(!connectMode);
    setStartCardId(null); 
  };

  const handleCardClick = (id) => {
    if (connectMode) {
      if (startCardId === null) {
        setStartCardId(id);
      } else {
        connectCards(startCardId, id);
        setStartCardId(null); 
      }
    } else {
      setEditableCardId(id); 
      const card = cards.find(c => c.id === id);
      if (card) {
        setEditorPosition({ x: card.x, y: card.y });
        setCardText(card.text);
        setShowEditor(true);
      }
    }
  };

  const handleShowMore = (card) => {
    setSelectedCard(card);
  };

  const handleModalClose = () => {
    setSelectedCard(null);
  };

  const handleSaveText = () => {
    setCards(cards.map(card => 
      card.id === editableCardId ? { ...card, text: cardText } : card
    ));
    setShowEditor(false);
    setEditableCardId(null);
  };

  return (
    <div id='ok' className="relative">
      <Header addCard={addCard} toggleConnectMode={toggleConnectMode} />
      <div className="relative mt-4">
        <Stage width={window.innerWidth} height={window.innerHeight - 100} ref={stageRef}>
          <Layer>
           
            {backgroundImage && (
              <Image
                image={backgroundImage}
                x={0}
                y={0}
                width={window.innerWidth}
                height={window.innerHeight - 100}
                perfectDrawEnabled={false}
              />
            )}

           
            {connections.map((conn, index) => {
              const startCard = cards.find((card) => card.id === conn.start);
              const endCard = cards.find((card) => card.id === conn.end);

              if (!startCard || !endCard) return null;

              return (
                <Line
                  key={index}
                  points={[
                    startCard.x + startCard.width / 2,
                    startCard.y + startCard.height / 2,
                    endCard.x + endCard.width / 2,
                    endCard.y + endCard.height / 2,
                  ]}
                  stroke="black"
                  strokeWidth={2}
                  tension={0.5}
                  lineCap="round"
                  pointerLength={10}
                  pointerWidth={10}
                />
              );
            })}

            {cards.map((card) => (
              <Group
                key={card.id}
                draggable
                x={card.x}
                y={card.y}
                onDragEnd={(e) => {
                  updateCardPosition(card.id, e.target.x(), e.target.y());
                }}
                onClick={() => handleCardClick(card.id)} // Handle card click
              >
                <Rect
                  width={card.width}
                  height={card.height}
                  fill="white"
                  stroke="grey"
                  strokeWidth={0.1}
                  cornerRadius={10}
                  shadowColor="rgba(0, 0, 0, 0.5)"
                  shadowBlur={10} 
                  shadowOffsetX={5}
                  shadowOffsetY={5}
                />
                <Text
                  text={card.text.substring(0, 50) + '...'}
                  width={card.width - 20}
                  padding={10}
                  fontSize={15}
                  y={10}
                />
                <Text
                  text="Show More"
                  fill="blue"
                  fontSize={14}
                  x={card.width / 2 - 30}
                  y={card.height - 30}
                  onClick={() => handleShowMore(card)}
                />
                <Text
                  text="✖" 
                  fontSize={20}
                  fill="red"
                  x={card.width - 30}
                  y={10}
                  onClick={() => setCards(cards.filter(c => c.id !== card.id))}
                />
              </Group>
            ))}
          </Layer>
        </Stage>
        {showEditor && (
          <div
            className="bg-white absolute"
            style={{
              top: editorPosition.y + 10,
              left: editorPosition.x + 10,
              width: '200px',
              height: '150px',
              zIndex: 10,
              border: '1px solid #ccc',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <textarea
              className="w-full h-full p-2 border border-gray-300"
              value={cardText}
              onChange={(e) => setCardText(e.target.value)}
            />
            <button
              className="w-full py-2 bg-green-400 text-white"
              onClick={handleSaveText}
            >
              Save
            </button>
          </div>
        )}
        {selectedCard && (
          <Modal
            card={selectedCard}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default App;
