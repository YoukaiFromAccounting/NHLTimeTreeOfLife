import React, { useState, useCallback } from 'react';
import { ChevronDown, ChevronRight, Plus, Trash2, Users, Calendar } from 'lucide-react';

const NHLTradeTree = () => {
  const [trades, setTrades] = useState([
    {
      id: 1,
      fromTeam: 'TOR',
      toTeam: 'BOS',
      player: 'Connor McDavid',
      compensation: ['David Pastrnak', '2024 1st Round Pick'],
      date: '2024-01-15',
      children: [
        {
          id: 2,
          fromTeam: 'BOS',
          toTeam: 'NYR',
          player: 'David Pastrnak',
          compensation: ['Igor Shesterkin', '2024 2nd Round Pick'],
          date: '2024-02-01',
          children: []
        }
      ]
    }
  ]);

  const [expandedNodes, setExpandedNodes] = useState(new Set([1]));
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTrade, setNewTrade] = useState({
    fromTeam: '',
    toTeam: '',
    player: '',
    compensation: '',
    date: '',
    parentId: null
  });

  // NHL team data with colors
  const nhlTeams = {
    'TOR': { name: 'Toronto Maple Leafs', color: '#003e7e', logo: '🏒' },
    'BOS': { name: 'Boston Bruins', color: '#000000', logo: '🐻' },
    'NYR': { name: 'New York Rangers', color: '#0038a8', logo: '🗽' },
    'MTL': { name: 'Montreal Canadiens', color: '#af1e2d', logo: '⚜️' },
    'EDM': { name: 'Edmonton Oilers', color: '#041e42', logo: '🛢️' },
    'CGY': { name: 'Calgary Flames', color: '#c8102e', logo: '🔥' },
    'VAN': { name: 'Vancouver Canucks', color: '#001f5b', logo: '🐋' },
    'WPG': { name: 'Winnipeg Jets', color: '#041e42', logo: '✈️' },
    'COL': { name: 'Colorado Avalanche', color: '#6f263d', logo: '🏔️' },
    'VGK': { name: 'Vegas Golden Knights', color: '#b4975a', logo: '⚔️' },
    'TB': { name: 'Tampa Bay Lightning', color: '#002868', logo: '⚡' },
    'FLA': { name: 'Florida Panthers', color: '#041e42', logo: '🐆' },
    'WSH': { name: 'Washington Capitals', color: '#c8102e', logo: '🦅' },
    'PIT': { name: 'Pittsburgh Penguins', color: '#000000', logo: '🐧' },
    'PHI': { name: 'Philadelphia Flyers', color: '#f74902', logo: '🦅' },
    'DET': { name: 'Detroit Red Wings', color: '#ce1126', logo: '🔴' },
    'CHI': { name: 'Chicago Blackhawks', color: '#cf0a2c', logo: '🪶' },
    'STL': { name: 'St. Louis Blues', color: '#002f87', logo: '🎵' },
    'MIN': { name: 'Minnesota Wild', color: '#a6192e', logo: '🐺' },
    'DAL': { name: 'Dallas Stars', color: '#006847', logo: '⭐' },
    'LAK': { name: 'Los Angeles Kings', color: '#111111', logo: '👑' },
    'SJS': { name: 'San Jose Sharks', color: '#006d75', logo: '🦈' },
    'ANA': { name: 'Anaheim Ducks', color: '#f47a38', logo: '🦆' },
    'SEA': { name: 'Seattle Kraken', color: '#001628', logo: '🦑' },
    'NSH': { name: 'Nashville Predators', color: '#ffb81c', logo: '🎸' },
    'ARI': { name: 'Arizona Coyotes', color: '#8c2633', logo: '🐺' },
    'CAR': { name: 'Carolina Hurricanes', color: '#cc0000', logo: '🌪️' },
    'CBJ': { name: 'Columbus Blue Jackets', color: '#002654', logo: '🧨' },
    'NJD': { name: 'New Jersey Devils', color: '#ce1126', logo: '😈' },
    'NYI': { name: 'New York Islanders', color: '#00539b', logo: '🏝️' },
    'OTT': { name: 'Ottawa Senators', color: '#c52032', logo: '🏛️' },
    'BUF': { name: 'Buffalo Sabres', color: '#002654', logo: '⚔️' }
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const addTrade = (parentId = null) => {
    setNewTrade({
      fromTeam: '',
      toTeam: '',
      player: '',
      compensation: '',
      date: '',
      parentId
    });
    setShowAddForm(true);
  };

  const saveTrade = () => {
    if (!newTrade.fromTeam || !newTrade.toTeam || !newTrade.player || !newTrade.compensation) {
      alert('Please fill in all required fields');
      return;
    }

    const trade = {
      id: Date.now(),
      ...newTrade,
      compensation: newTrade.compensation.split(',').map(item => item.trim()),
      children: []
    };

    if (newTrade.parentId) {
      // Add as child to existing trade
      const addToParent = (trades) => {
        return trades.map(t => {
          if (t.id === newTrade.parentId) {
            return { ...t, children: [...t.children, trade] };
          }
          return { ...t, children: addToParent(t.children) };
        });
      };
      setTrades(addToParent(trades));
    } else {
      // Add as new root trade
      setTrades([...trades, trade]);
    }

    setShowAddForm(false);
    setNewTrade({
      fromTeam: '',
      toTeam: '',
      player: '',
      compensation: '',
      date: '',
      parentId: null
    });
  };

  const deleteTrade = (tradeId) => {
    const removeFromTrades = (trades) => {
      return trades.filter(t => t.id !== tradeId).map(t => ({
        ...t,
        children: removeFromTrades(t.children)
      }));
    };
    setTrades(removeFromTrades(trades));
  };

  const TeamLogo = ({ teamCode, size = 'w-8 h-8' }) => {
    const team = nhlTeams[teamCode];
    if (!team) return <div className={`${size} bg-gray-300 rounded-full flex items-center justify-center text-sm`}>?</div>;
    
    return (
      <div 
        className={`${size} rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
        style={{ backgroundColor: team.color }}
        title={team.name}
      >
        <span className="text-lg">{team.logo}</span>
      </div>
    );
  };

  const TradeNode = ({ trade, level = 0 }) => {
    const isExpanded = expandedNodes.has(trade.id);
    const hasChildren = trade.children && trade.children.length > 0;
    
    return (
      <div className="relative">
        {/* Connection line for non-root nodes */}
        {level > 0 && (
          <div className="absolute left-4 top-0 w-px h-6 bg-gray-300"></div>
        )}
        
        <div className={`flex items-start space-x-4 p-4 rounded-lg shadow-lg bg-white border-2 hover:shadow-xl transition-all duration-300 ${level > 0 ? 'ml-8 mt-4' : 'mb-6'}`}>
          {/* Expand/Collapse button */}
          <button
            onClick={() => toggleNode(trade.id)}
            className="mt-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
            disabled={!hasChildren}
          >
            {hasChildren ? (
              isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            ) : (
              <div className="w-4 h-4"></div>
            )}
          </button>

          {/* Trade content */}
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <div className="flex items-center space-x-2">
                <TeamLogo teamCode={trade.fromTeam} />
                <span className="font-medium text-gray-700">{nhlTeams[trade.fromTeam]?.name || trade.fromTeam}</span>
              </div>
              <div className="text-2xl">→</div>
              <div className="flex items-center space-x-2">
                <TeamLogo teamCode={trade.toTeam} />
                <span className="font-medium text-gray-700">{nhlTeams[trade.toTeam]?.name || trade.toTeam}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Users size={16} className="text-blue-500" />
                <span className="font-semibold text-lg">{trade.player}</span>
              </div>
              
              <div className="text-sm text-gray-600">
                <strong>Compensation:</strong> {trade.compensation.join(', ')}
              </div>
              
              {trade.date && (
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar size={14} />
                  <span>{trade.date}</span>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2 mt-3">
              <button
                onClick={() => addTrade(trade.id)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
              >
                <Plus size={14} />
                <span>Add Sub-Trade</span>
              </button>
              <button
                onClick={() => deleteTrade(trade.id)}
                className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="relative">
            {level > 0 && (
              <div className="absolute left-4 top-0 w-px h-full bg-gray-300"></div>
            )}
            {trade.children.map(child => (
              <TradeNode key={child.id} trade={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">NHL Trade Tree Generator</h1>
          <p className="text-gray-600">Visualize the cascade of NHL trades and their interconnected relationships</p>
        </div>

        {/* Add new trade button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => addTrade()}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mx-auto"
          >
            <Plus size={20} />
            <span>Add New Trade</span>
          </button>
        </div>

        {/* Trade tree */}
        <div className="space-y-4">
          {trades.map(trade => (
            <TradeNode key={trade.id} trade={trade} />
          ))}
        </div>

        {/* Add trade form modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Trade</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">From Team</label>
                  <select
                    value={newTrade.fromTeam}
                    onChange={(e) => setNewTrade({...newTrade, fromTeam: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select team...</option>
                    {Object.entries(nhlTeams).map(([code, team]) => (
                      <option key={code} value={code}>{team.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">To Team</label>
                  <select
                    value={newTrade.toTeam}
                    onChange={(e) => setNewTrade({...newTrade, toTeam: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select team...</option>
                    {Object.entries(nhlTeams).map(([code, team]) => (
                      <option key={code} value={code}>{team.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Player Traded</label>
                  <input
                    type="text"
                    value={newTrade.player}
                    onChange={(e) => setNewTrade({...newTrade, player: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Player name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Compensation (comma-separated)</label>
                  <input
                    type="text"
                    value={newTrade.compensation}
                    onChange={(e) => setNewTrade({...newTrade, compensation: e.target.value})}
                    className="w-full p-2 border rounded-md"
                    placeholder="Player 1, Player 2, Draft Pick"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Trade Date</label>
                  <input
                    type="date"
                    value={newTrade.date}
                    onChange={(e) => setNewTrade({...newTrade, date: e.target.value})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={saveTrade}
                  className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Save Trade
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {trades.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No trades yet. Click "Add New Trade" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NHLTradeTree;
