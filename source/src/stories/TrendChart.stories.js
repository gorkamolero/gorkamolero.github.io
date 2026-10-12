import Component from '../components/TrendChart.astro';
import channel from '../data/saga-channel.json';
const xTicks = ['2023-12-14', '2023-12-25', '2024-01-16', '2024-02-01'];
export default {title:'Components/TrendChart', component:Component, parameters:{page:"saga"}};
export const LineWithBars = {args:{
  points: channel.days.map(d => ({date:d.date, value:d.subscribersTotal, bar:d.shortsPublished})),
  yTicks: [0, 250, 500, 750, 1000], xTicks, barLabel: 'Shorts published',
  marker: {date:'2024-01-16', label:'Last upload', place:'bottom'},
  label: 'Subscribers by day, with the Shorts published each day.',
  caption: 'Subscribers, day by day, with the Shorts published each day underneath.'
}};
export const Area = {args:{
  points: channel.days.map(d => ({date:d.date, value:d.views})),
  area: true, yTicks: [0, 5000, 10000], xTicks,
  marker: {date:'2024-01-16', label:'Last upload', place:'top'},
  label: 'Views per day.',
  caption: 'Views per day, from the first upload to 1 February.'
}};
