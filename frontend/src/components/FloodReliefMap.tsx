import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Package, Wrench } from 'lucide-react';
import { Map } from './Map';
import { MapWrapper } from './MapWrapper';

const FloodReliefMap = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  // Replace the existing tasks state with this:
  const [tasks] = useState([
    { 
      id: 1, 
      type: 'task', 
      title: 'Muro de contención necesario', 
      location: 'Ribera Norte',
      latitude: 39.4789,
      longitude: -0.3676, 
      urgency: 'high', 
      volunteers: 5 
    },
    { 
      id: 2, 
      type: 'supplies', 
      title: 'Se necesitan suministros médicos', 
      location: 'Hospital Central',
      latitude: 39.4623,
      longitude: -0.3723, 
      urgency: 'medium', 
      items: ['vendas', 'antibióticos'] 
    },
    { 
      id: 3, 
      type: 'equipment', 
      title: 'Se requieren bombas de agua', 
      location: 'Distrito Este',
      latitude: 39.4699,
      longitude: -0.3563, 
      urgency: 'high', 
      items: ['bombas', 'generadores'] 
    }
  ]);



  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Coordinación de Ayuda en Inundaciones</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant={activeTab === 'tasks' ? 'default' : 'outline'}
              onClick={() => setActiveTab('tasks')}
            >
              <Wrench className="w-4 h-4 mr-2" />
              Tareas
            </Button>
            <Button 
              variant={activeTab === 'supplies' ? 'default' : 'outline'}
              onClick={() => setActiveTab('supplies')}
            >
              <Package className="w-4 h-4 mr-2" />
              Suministros
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[500px] bg-slate-100 rounded-lg mb-4">
            <MapWrapper tasks={tasks} />
          </div>
          
          <div className="space-y-4">
            {tasks.filter(task => 
              activeTab === 'tasks' ? task.type === 'task' : ['supplies', 'equipment'].includes(task.type)
            ).map(task => (
              <Card key={task.id} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <h3 className="font-semibold">{task.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{task.location}</p>
                    <div className="mt-2">
                      {task.type === 'task' ? (
                        <p className="text-sm">Voluntarios necesarios: {task.volunteers}</p>
                      ) : (
                        <ul className="text-sm list-disc list-inside">
                          {task.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    task.urgency === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.urgency.toUpperCase()}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FloodReliefMap;