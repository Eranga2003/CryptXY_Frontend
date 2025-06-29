import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Moon,
  Sun,
  Search,
  Image as ImageIcon,
  Video as VideoIcon,
  User,
  MoreVertical,
  X,
  AlertTriangle,
  MessageCircle,
  Activity
} from 'lucide-react';

const ChatPageB = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [userFile, setUserFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loggedUser, setLoggedUser] = useState({ id: null, first_name: '', email: '', is_admin: false });
  const [signalMessage, setSignalMessage] = useState('');
  const [showSignalForm, setShowSignalForm] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'signals'
  const [signals, setSignals] = useState([]); // Add this state at the top with other useStates
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const signalFormRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setLoggedUser({
        id: parsed.id || null,
        first_name: parsed.first_name || '',
        email: parsed.email || '',
        is_admin: parsed.is_admin || false
      });
    }
    fetchMessages();

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Close signal form when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signalFormRef.current && !signalFormRef.current.contains(event.target)) {
        setShowSignalForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch signals from backend
  const fetchSignals = async () => {
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/getTradingSignal.php');
      const data = await res.json();
      if (data.success) {
        setSignals(data.signals || []);
      }
    } catch (err) {
      console.error('Error fetching signals', err);
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/getMessages.php');
      const data = await res.json();
      if (data.success) {
        const processedMessages = data.user_chat.map(msg => ({
          ...msg,
          type: msg.type || 'chat', // Default to chat if no type
          media_url: msg.media_url ? makeAbsoluteUrl(msg.media_url) : null
        }));
        setMessages(processedMessages || []);
      }
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  const makeAbsoluteUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    return `http://localhost:8080${url.startsWith('/') ? url : '/' + url}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setUserFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSend = async () => {
    if (!userMessage.trim() && !userFile) return;

    const formData = new FormData();
    formData.append('message', userMessage);
    formData.append('user_id', loggedUser.id);
    formData.append('type', 'chat'); // Regular chat message
    if (userFile) formData.append('media', userFile);

    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/postUserMessage.php', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        const newMsg = {
          id: Date.now(),
          message: userMessage,
          media_url: data.media_url ? makeAbsoluteUrl(data.media_url) : null,
          first_name: loggedUser.first_name,
          email: loggedUser.email,
          timestamp: new Date().toISOString(),
          type: 'chat'
        };
        setMessages(prev => [...prev, newMsg]);
        setUserMessage('');
        setUserFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        console.error('Message send failed:', data.message);
      }
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  // Function to send live signal (admin only)
  const handleSendSignal = async () => {
    if (!signalMessage.trim()) return;

    try {
      const formData = new FormData();
      formData.append('message', signalMessage);
      formData.append('user_id', loggedUser.id);
      formData.append('type', 'signal'); // Signal type

      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/postUserMessage.php', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        const newSignal = {
          id: Date.now(),
          message: signalMessage,
          first_name: loggedUser.first_name,
          email: loggedUser.email,
          timestamp: new Date().toISOString(),
          type: 'signal'
        };
        setMessages(prev => [...prev, newSignal]);
        setSignalMessage('');
        setShowSignalForm(false);
      } else {
        console.error('Signal send failed:', data.message);
      }
    } catch (err) {
      console.error('Error sending signal', err);
    }
  };

  // Function to send a trading signal (admin only)
  const handleSendTradingSignal = async () => {
    if (!signalMessage.trim()) return;
    try {
      const res = await fetch('http://localhost:8080/cryptoXY_backend_php/postTradingSignal.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: signalMessage }),
      });
      const data = await res.json();
      if (data.success) {
        setSignalMessage('');
        fetchSignals(); // Refresh signals list
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Error sending signal');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatTime = (timestamp) => new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <aside className={`w-56 bg-gray-900 border-r border-gray-800 flex flex-col py-8 px-4`}>
        <h2 className="text-xl font-bold text-white mb-8">CryptoXY</h2>
        <button
          className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-4 font-medium transition ${
            activeTab === 'chat'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageCircle size={20} />
          User Chat
        </button>
        <button
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${
            activeTab === 'signals'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          onClick={() => setActiveTab('signals')}
        >
          <Activity size={20} />
          Live Trading Signals
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {activeTab === 'chat' ? (
          // ...your existing chat JSX here...
          // (Paste your current main chat area code here)
          <>
            {/* Chat Header */}
            <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-medium">
                  G
                </div>
                <div>
                  <h2 className="font-bold text-white">General Chat</h2>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {messages.length} participants
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {loggedUser.is_admin && (
                  <button 
                    onClick={() => setShowSignalForm(!showSignalForm)}
                    className={`px-3 py-1.5 rounded-lg flex items-center space-x-1 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600' 
                        : 'bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500'
                    }`}
                  >
                    <AlertTriangle size={16} className="text-white" />
                    <span className="text-white text-sm font-medium">Signal</span>
                  </button>
                )}
                <button className="p-2 rounded-full hover:bg-gray-700">
                  <Search className="text-gray-400" size={18} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-700">
                  <MoreVertical className="text-gray-400" size={18} />
                </button>
              </div>
            </div>
            
            {/* Signal Form (Admin Only) */}
            {showSignalForm && loggedUser.is_admin && (
              <div 
                ref={signalFormRef}
                className={`p-3 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-amber-900/50 to-orange-900/50 border-b border-amber-800' 
                    : 'bg-gradient-to-r from-amber-100 to-orange-100 border-b border-amber-200'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                    <AlertTriangle size={16} className="text-white" />
                  </div>
                  <h3 className="ml-2 font-bold text-lg text-amber-800 dark:text-amber-200">Send Live Signal</h3>
                  <button 
                    onClick={() => setShowSignalForm(false)}
                    className="ml-auto p-1 rounded-full hover:bg-amber-800/20 dark:hover:bg-amber-200/20"
                  >
                    <X size={18} className="text-amber-600 dark:text-amber-300" />
                  </button>
                </div>
                <div className="flex">
                  <input
                    className={`flex-1 rounded-l-lg px-3 py-2 ${
                      isDarkMode 
                        ? 'bg-amber-900/30 text-amber-100 placeholder-amber-400 border border-amber-700' 
                        : 'bg-amber-50 text-amber-900 placeholder-amber-500 border border-amber-300'
                    } focus:outline-none focus:ring-1 focus:ring-amber-500`}
                    placeholder="Enter important signal message..."
                    value={signalMessage}
                    onChange={(e) => setSignalMessage(e.target.value)}
                    aria-label="Signal message"
                  />
                  <button
                    onClick={handleSendSignal}
                    className={`rounded-r-lg px-4 font-medium ${
                      signalMessage.trim()
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
                        : isDarkMode
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                    disabled={!signalMessage.trim()}
                  >
                    Broadcast
                  </button>
                </div>
              </div>
            )}
            
            {/* Messages Area */}
            <div className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-600/20 flex items-center justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                      <div className="text-white text-3xl">C</div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Welcome to CryptoXY Chat!</h3>
                  <p className={`max-w-md ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Start the conversation by sending your first message. Share insights, ask questions, and collaborate with your team.
                  </p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isCurrentUser = msg.email === loggedUser.email;

                  // Render signal messages differently
                  if (msg.type === 'signal') {
                    return (
                      <div 
                        key={msg.id ?? `${msg.timestamp}-${msg.email}`}
                        className="flex justify-center mb-6"
                      >
                        <div 
                          className={`max-w-3xl w-full rounded-xl p-4 ${
                            isDarkMode 
                              ? 'bg-gradient-to-r from-amber-800/70 to-orange-800/70 border border-amber-700/50' 
                              : 'bg-gradient-to-r from-amber-200/80 to-orange-200/80 border border-amber-300'
                          }`}
                        >
                          <div className="flex items-center mb-2">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
                              <AlertTriangle size={12} className="text-white" />
                            </div>
                            <span className="ml-2 font-bold text-amber-700 dark:text-amber-200">
                              Live Signal from {msg.first_name}
                            </span>
                            <span className={`ml-auto text-xs ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                          <p className={`text-base ${isDarkMode ? 'text-amber-100' : 'text-amber-900'}`}>
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  
                  // Regular chat messages
                  return (
                    <div 
                      key={msg.id ?? `${msg.timestamp}-${msg.email}`}
                      className={`flex mb-6 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isCurrentUser && (
                        <div className="mr-3 mt-1">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-sm">
                            {msg.first_name?.[0]?.toUpperCase() || 'U'}
                          </div>
                        </div>
                      )}
                      
                      <div className={`max-w-[75%] ${isCurrentUser ? 'flex flex-col items-end' : ''}`}>
                        <div className="flex items-center mb-1">
                          {!isCurrentUser && (
                            <span className="font-medium text-white mr-2">{msg.first_name}</span>
                          )}
                          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                        
                        <div 
                          className={`rounded-2xl px-4 py-3 ${isCurrentUser 
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none' 
                            : isDarkMode 
                              ? 'bg-gray-700 text-white rounded-tl-none' 
                              : 'bg-white text-gray-900 border border-gray-200 rounded-tl-none'
                          }`}
                        >
                          {msg.message && <p className="whitespace-pre-wrap">{msg.message}</p>}
                          
                          {msg.media_url && (
                            <div className={`mt-2 ${msg.message ? 'mt-3' : ''}`}>
                              {msg.media_url.toLowerCase().endsWith('.mp4') ? (
                                <div className="relative">
                                  <video 
                                    src={msg.media_url} 
                                    controls 
                                    className="rounded-xl max-w-xs md:max-w-md object-cover"
                                  />
                                  <div className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1.5">
                                    <VideoIcon className="text-white" size={16} />
                                  </div>
                                </div>
                              ) : (
                                <div className="relative">
                                  <img 
                                    src={msg.media_url} 
                                    alt="Attachment" 
                                    className="rounded-xl max-w-xs md:max-w-md object-cover"
                                  />
                                  <div className="absolute bottom-2 right-2 bg-black/50 rounded-full p-1.5">
                                    <ImageIcon className="text-white" size={16} />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {isCurrentUser && (
                        <div className="ml-3 mt-1">
                          <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                            {loggedUser.first_name?.[0]?.toUpperCase() || 'U'}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
              {previewUrl && (
                <div className="mb-3 relative">
                  <div className="relative inline-block">
                    {userFile?.type.startsWith('video') ? (
                      <video 
                        src={previewUrl} 
                        className="rounded-xl max-w-full max-h-48 object-cover"
                      />
                    ) : (
                      <img 
                        src={previewUrl} 
                        className="rounded-xl max-w-full max-h-48 object-cover"
                        alt="Preview"
                      />
                    )}
                    <button 
                      onClick={() => {
                        setPreviewUrl(null);
                        setUserFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = null;
                      }}
                      className="absolute -top-2 -right-2 bg-gray-800 rounded-full p-1 hover:bg-gray-700 border border-gray-600"
                    >
                      <X className="text-white" size={16} />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="flex items-end">
                <div className="flex-1 relative">
                  <div className={`flex rounded-2xl ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} p-1.5`}>
                    <label 
                      htmlFor="file-upload"
                      className={`p-2 rounded-full cursor-pointer ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'}`}
                      title="Attach file"
                    >
                      <ImageIcon className="text-gray-400" size={20} />
                    </label>
                    <input
                      id="file-upload"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      multiple={false}
                    />
                    
                    <textarea
                      className={`flex-1 py-2 px-3 mx-1 min-h-[40px] max-h-32 focus:outline-none resize-none ${
                        isDarkMode ? 'bg-gray-700 text-white placeholder-gray-500' : 'bg-gray-100 text-gray-900 placeholder-gray-400'
                      }`}
                      placeholder="Type a message..."
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      rows={1}
                      aria-label="Message input"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleSend}
                  disabled={!userMessage.trim() && !userFile}
                  className={`ml-3 h-12 w-12 rounded-full flex items-center justify-center ${
                    userMessage.trim() || userFile 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-600 hover:to-blue-700' 
                      : isDarkMode 
                        ? 'bg-gray-700 text-gray-500' 
                        : 'bg-gray-200 text-gray-400'
                  }`}
                  aria-label="Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // Signals area (customize as needed)
          <div className="flex-1 flex flex-col items-center justify-start p-8">
            <h2 className="text-2xl font-bold mb-4 text-white">Live Trading Signals</h2>
            {/* Admin signal form */}
            {loggedUser.is_admin && (
              <div className="w-full max-w-xl mb-6">
                <div className="flex gap-2">
                  <input
                    className="flex-1 rounded-l-lg px-3 py-2 bg-gray-800 text-white border border-gray-700 focus:outline-none"
                    placeholder="Enter trading signal..."
                    value={signalMessage}
                    onChange={e => setSignalMessage(e.target.value)}
                  />
                  <button
                    onClick={handleSendTradingSignal}
                    className="rounded-r-lg px-4 bg-blue-600 text-white font-semibold hover:bg-blue-700"
                    disabled={!signalMessage.trim()}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
            {/* Signals list */}
            <div className="w-full max-w-xl space-y-4">
              {signals.length === 0 ? (
                <div className="text-gray-400 text-center">No trading signals yet.</div>
              ) : (
                signals.map(sig => (
                  <div key={sig.id} className="bg-gray-800 rounded-lg p-4 shadow">
                    <div className="flex items-center mb-1">
                      <AlertTriangle className="text-amber-400 mr-2" size={18} />
                      <span className="font-bold text-white">Admin</span>
                      <span className="ml-auto text-xs text-gray-400">{new Date(sig.created_at).toLocaleString()}</span>
                    </div>
                    <div className="text-white">{sig.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPageB;