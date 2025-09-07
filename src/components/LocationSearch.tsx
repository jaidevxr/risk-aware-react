import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SearchResult {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; name: string }) => void;
}

// Sample Indian cities and districts for search
const indianLocations: SearchResult[] = [
  { name: 'Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Bangalore', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Surat', state: 'Gujarat', lat: 21.1702, lng: 72.8311 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462 },
  { name: 'Kanpur', state: 'Uttar Pradesh', lat: 26.4499, lng: 80.3319 },
  { name: 'Nagpur', state: 'Maharashtra', lat: 21.1458, lng: 79.0882 },
  { name: 'Indore', state: 'Madhya Pradesh', lat: 22.7196, lng: 75.8577 },
  { name: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
  { name: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376 },
  { name: 'Vadodara', state: 'Gujarat', lat: 22.3072, lng: 73.1812 },
  { name: 'Ludhiana', state: 'Punjab', lat: 30.9010, lng: 75.8573 },
  { name: 'Agra', state: 'Uttar Pradesh', lat: 27.1767, lng: 78.0081 }
];

export const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    if (term.length > 1) {
      const filtered = indianLocations.filter(location =>
        location.name.toLowerCase().includes(term.toLowerCase()) ||
        location.state.toLowerCase().includes(term.toLowerCase())
      );
      setResults(filtered.slice(0, 5)); // Show top 5 results
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleSelectLocation = (location: SearchResult) => {
    onLocationSelect({
      lat: location.lat,
      lng: location.lng,
      name: `${location.name}, ${location.state}`
    });
    setSearchTerm(location.name);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search state, district, or city..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary"
        />
      </div>

      {showResults && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 bg-background/95 backdrop-blur-sm border-border/50 shadow-intense">
          <div className="p-2 space-y-1">
            {results.map((result, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:bg-muted/50"
                onClick={() => handleSelectLocation(result)}
              >
                <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                <div className="text-left">
                  <div className="font-medium">{result.name}</div>
                  <div className="text-sm text-muted-foreground">{result.state}</div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};