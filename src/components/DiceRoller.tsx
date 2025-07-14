import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';

const DiceRoller = () => {
  const [diceValue, setDiceValue] = useState<number>(1);
  const [sides, setSides] = useState<number>(6);
  const [isRolling, setIsRolling] = useState(false);

  const diceIcons = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6,
  };

  const rollDice = () => {
    setIsRolling(true);
    
    // Simulate rolling animation
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * sides) + 1);
    }, 100);

    // Stop after 1 second and set final value
    setTimeout(() => {
      clearInterval(rollInterval);
      setDiceValue(Math.floor(Math.random() * sides) + 1);
      setIsRolling(false);
    }, 1000);
  };

  const handleSidesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 2) {
      setSides(value);
      setDiceValue(1); // Reset dice value when sides change
    }
  };

  const DiceIcon = diceIcons[diceValue as keyof typeof diceIcons];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            🎲 Lucky Dice
          </CardTitle>
          <p className="text-gray-600 mt-2">Roll the dice and test your luck!</p>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-6">
          <div className="w-full space-y-2">
            <Label htmlFor="sides" className="text-sm font-medium text-gray-700">
              Number of sides:
            </Label>
            <Input
              id="sides"
              type="number"
              min="2"
              max="100"
              value={sides}
              onChange={handleSidesChange}
              className="text-center text-lg font-bold"
              placeholder="Enter number of sides"
            />
          </div>

          <div className="relative">
            {DiceIcon && sides <= 6 ? (
              <DiceIcon 
                size={120} 
                className={`text-indigo-600 transition-transform duration-300 ${
                  isRolling ? 'animate-spin' : 'hover:scale-110'
                }`}
              />
            ) : (
              <div className={`w-32 h-32 border-4 border-indigo-600 rounded-lg flex items-center justify-center text-4xl font-bold text-indigo-600 transition-transform duration-300 ${
                isRolling ? 'animate-spin' : 'hover:scale-110'
              }`}>
                {diceValue}
              </div>
            )}
            {!isRolling && sides <= 6 && DiceIcon && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                {diceValue}
              </div>
            )}
          </div>
          
          <Button 
            onClick={rollDice} 
            disabled={isRolling}
            size="lg"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {isRolling ? 'Rolling...' : 'Roll Dice'}
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">
              {diceValue === sides ? "🎉 Maximum roll!" : 
               diceValue >= Math.ceil(sides * 0.75) ? "😊 Great roll!" : 
               diceValue >= Math.ceil(sides * 0.5) ? "🙂 Good roll!" :
               "🤞 Try again!"}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              You rolled {diceValue} out of {sides}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiceRoller;