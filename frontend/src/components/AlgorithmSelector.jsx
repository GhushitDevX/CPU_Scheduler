
const AlgorithmSelector = ({ 
  algorithm, 
  onAlgorithmChange, 
  isPreemptive, 
  onPreemptiveChange,
  timeQuantum,
  onTimeQuantumChange
}) => {
  const algorithms = [
    { id: 'FCFS', name: 'First Come First Served' },
    { id: 'SJF', name: 'Shortest Job First' },
    { id: 'RR', name: 'Round Robin' },
    { id: 'Priority', name: 'Priority Scheduling' }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Select Scheduling Algorithm</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {algorithms.map(algo => (
          <button
            key={algo.id}
            className={`p-4 rounded-lg text-center transition-all ${
              algorithm === algo.id 
                ? 'bg-blue-600 shadow-lg' 
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => onAlgorithmChange(algo.id)}
          >
            <div className="font-medium">{algo.name}</div>
          </button>
        ))}
      </div>
      
      {(algorithm === 'SJF' || algorithm === 'Priority') && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Execution Mode</h3>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                !isPreemptive ? 'bg-blue-600' : 'bg-gray-700'
              }`}
              onClick={() => onPreemptiveChange(false)}
            >
              Non-Preemptive
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                isPreemptive ? 'bg-blue-600' : 'bg-gray-700'
              }`}
              onClick={() => onPreemptiveChange(true)}
            >
              Preemptive
            </button>
          </div>
        </div>
      )}
      
      {algorithm === 'RR' && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3">Time Quantum</h3>
          <div className="flex items-center">
            <input
              type="number"
              min="1"
              value={timeQuantum}
              onChange={(e) => onTimeQuantumChange(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-2">time units</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmSelector;