import Footer from '../components/Footer.astro';
export default {title:'Components/Footer',component:Footer};
export const Desktop = {};
export const Phone = {parameters:{phone:true}, globals:{viewport:{value:'phone',isRotated:false}}};
