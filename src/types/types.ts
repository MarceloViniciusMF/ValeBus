export interface BusLine {
  id: string;
  number: string;
  route: string;
  timeRange: string;
  eta: string;
  status: 'NO HORÁRIO' | 'ATRASADO';
}

export interface UpcomingBus {
  id: string;
  line: string;
  destination: string;
  distance: string;
  arrivalTime: string;
}