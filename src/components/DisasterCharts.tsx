import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card } from '@/components/ui/card';
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

const rainfallData = [
  { month: 'Jan', rainfall: 25, temperature: 22 },
  { month: 'Feb', rainfall: 30, temperature: 25 },
  { month: 'Mar', rainfall: 45, temperature: 28 },
  { month: 'Apr', rainfall: 60, temperature: 32 },
  { month: 'May', rainfall: 120, temperature: 35 },
  { month: 'Jun', rainfall: 180, temperature: 33 },
  { month: 'Jul', rainfall: 220, temperature: 30 },
  { month: 'Aug', rainfall: 200, temperature: 29 },
  { month: 'Sep', rainfall: 150, temperature: 31 },
  { month: 'Oct', rainfall: 80, temperature: 28 },
  { month: 'Nov', rainfall: 35, temperature: 24 },
  { month: 'Dec', rainfall: 20, temperature: 21 }
];

const disasterTypeData = [
  { name: 'Floods', value: 35, count: 42 },
  { name: 'Cyclones', value: 25, count: 18 },
  { name: 'Droughts', value: 20, count: 15 },
  { name: 'Heatwaves', value: 20, count: 12 }
];

const riskLevelData = [
  { level: 'High', count: 23, color: '#dc2626' },
  { level: 'Medium', count: 45, color: '#ea580c' },
  { level: 'Low', count: 67, color: '#16a34a' },
  { level: 'Safe', count: 89, color: '#22c55e' }
];

const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444'];

export const DisasterCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Rainfall & Temperature Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 bg-gradient-card border-0 shadow-card-soft backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Rainfall & Temperature Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={rainfallData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rainfall" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="hsl(var(--accent))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--accent))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>

      {/* Disaster Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 bg-gradient-card border-0 shadow-card-soft backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-secondary" />
            <h3 className="text-lg font-semibold">Disaster Type Distribution</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={disasterTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {disasterTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: any, name: any) => [`${value}%`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-4">
            {disasterTypeData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">({item.count})</span>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Risk Level Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-2"
      >
        <Card className="p-6 bg-gradient-card border-0 shadow-card-soft backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-semibold">Risk Level Analysis by Region</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={riskLevelData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="level" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[4, 4, 0, 0]}
                fill="url(#colorGradient)"
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </motion.div>
    </div>
  );
};