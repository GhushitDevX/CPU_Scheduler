import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const ProcessInputForm = ({ algorithm, isPreemptive, processes, onProcessesChange }) => {
  const addProcess = () => {
    const newId = `P${processes.length + 1}`;
    onProcessesChange([...processes, { id: newId, arrivalTime: 0, burstTime: 1, priority: 1 }]);
  };

  const removeProcess = (index) => {
    if (processes.length > 1) {
      const newProcesses = [...processes];
      newProcesses.splice(index, 1);
      // Update process IDs to be sequential
      const updatedProcesses = newProcesses.map((p, idx) => ({
        ...p,
        id: `P${idx + 1}`
      }));
      onProcessesChange(updatedProcesses);
    }
  };

  const updateProcess = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index] = { ...newProcesses[index], [field]: value };
    onProcessesChange(newProcesses);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Process Details</h2>
        <button
          onClick={addProcess}
          className="flex items-center space-x-1 text-blue-400 hover:text-blue-300"
        >
          <PlusCircle size={20} />
          <span>Add Process</span>
        </button>
      </div>

      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="pb-2 px-4">Process ID</th>
              <th className="pb-2 px-4">Arrival Time</th>
              <th className="pb-2 px-4">Burst Time</th>
              {algorithm === 'Priority' && <th className="pb-2 px-4">Priority</th>}
              <th className="pb-2 px-4 w-16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index} className="border-b border-gray-800 hover:bg-gray-800">
                <td className="py-3 px-4">
                  <input
                    type="text"
                    value={process.id}
                    onChange={(e) => updateProcess(index, 'id', e.target.value)}
                    className="bg-gray-700 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="0"
                    value={process.arrivalTime}
                    onChange={(e) => updateProcess(index, 'arrivalTime', e.target.value)}
                    className="bg-gray-700 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                <td className="py-3 px-4">
                  <input
                    type="number"
                    min="1"
                    value={process.burstTime}
                    onChange={(e) => updateProcess(index, 'burstTime', e.target.value)}
                    className="bg-gray-700 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </td>
                {algorithm === 'Priority' && (
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      min="1"
                      value={process.priority}
                      onChange={(e) => updateProcess(index, 'priority', e.target.value)}
                      className="bg-gray-700 px-3 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>
                )}
                <td className="py-3 px-4">
                  <button
                    onClick={() => removeProcess(index)}
                    disabled={processes.length <= 1}
                    className="text-red-400 hover:text-red-300 disabled:opacity-30"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProcessInputForm;