/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { mediaConfig } from './data/mediaConfig';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Star, 
  ChevronRight, 
  Menu as MenuIcon, 
  X, 
  Coffee, 
  Utensils, 
  ChevronLeft, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  Heart,
  Search,
  Check,
  Calendar,
  Users,
  MessageSquare
} from 'lucide-react';

// Interfaces
interface MenuItem {
  id: string;
  name: string;
  price: number | string;
  price8?: number;
  price10?: number;
  halfPrice?: number;
  fullPrice?: number;
  category: string;
  isVeg: boolean;
  isPopular?: boolean;
  description?: string;
}

// Full Authoritative Menu Data from the uploaded reference
const MENU_DATA: MenuItem[] = [
  // TEA
  { id: 't1', name: 'Zafrani Chai', price: 35, category: 'TEA', isVeg: true, isPopular: true, description: 'Rich traditional saffron-infused tea brewed with fresh milk.' },
  { id: 't2', name: 'Green Tea', price: 25, category: 'TEA', isVeg: true, description: 'Soothing and antioxidant-rich organic green tea.' },
  { id: 't3', name: 'Masala Tea', price: 30, category: 'TEA', isVeg: true, description: 'Traditional spiced tea brewed with ginger, cardamom, and herbs.' },
  { id: 't4', name: 'Plain Tea', price: 20, category: 'TEA', isVeg: true, description: 'Classic simple milk tea brewed to perfection.' },
  { id: 't5', name: 'Lemon Tea', price: 20, category: 'TEA', isVeg: true, description: 'Tangy and refreshing black tea infused with fresh lemon squeeze.' },

  // COFFEE (HOT & COLD)
  { id: 'c1', name: 'Classic Hot Coffee', price: 79, category: 'COFFEE', isVeg: true, isPopular: true, description: 'Expertly brewed fresh espresso with smooth steamed milk.' },
  { id: 'c2', name: 'Chocolate Coffee', price: 79, category: 'COFFEE', isVeg: true, description: 'Gourmet blend of espresso, chocolate sauce, and milk.' },
  { id: 'c3', name: 'Caramel Hot Coffee', price: 79, category: 'COFFEE', isVeg: true, description: 'Warm espresso sweetened with rich buttery caramel drizzle.' },
  { id: 'c4', name: 'Filter Hot Coffee', price: 79, category: 'COFFEE', isVeg: true, description: 'Traditional South Indian style filter coffee with a strong aroma.' },
  { id: 'c5', name: 'English Butterscotch Brew', price: 89, category: 'COFFEE', isVeg: true, description: 'Premium flavored espresso infused with English butterscotch.' },
  { id: 'c6', name: 'Turkey Hazelnut Brew', price: 89, category: 'COFFEE', isVeg: true, isPopular: true, description: 'Premium flavored hot brew featuring rich Turkish hazelnut aroma.' },
  { id: 'c7', name: 'French Vanilla Brew', price: 89, category: 'COFFEE', isVeg: true, description: 'Elegant French vanilla extract paired with velvety hot espresso.' },
  { id: 'c8', name: 'Colombian Gold Brew', price: 89, category: 'COFFEE', isVeg: true, description: 'Rich, bold, single-origin style premium hot brew.' },
  { id: 'c9', name: 'Cold Coffee', price: 89, category: 'COFFEE', isVeg: true, description: 'Chilled cream milk blended with deep espresso roast and ice.' },
  { id: 'c10', name: 'Cold Coffee with Ice Cream', price: 119, category: 'COFFEE', isVeg: true, isPopular: true, description: 'Our signature cold coffee topped with a luxurious scoop of vanilla ice cream.' },
  { id: 'c11', name: 'Hazelnut Cold Coffee', price: 99, category: 'COFFEE', isVeg: true, description: 'Delicious cold coffee enriched with rich hazelnut flavor.' },
  { id: 'c12', name: 'Caramel Cold Coffee', price: 99, category: 'COFFEE', isVeg: true, description: 'Ice blended coffee accented with sweet, buttery caramel.' },

  // STARTERS
  { id: 's1', name: 'Paneer Chilly Dry', price: 220, category: 'STARTERS', isVeg: true, description: 'Wok-tossed paneer cubes, bell peppers, and scallions in soy-chili glaze.' },
  { id: 's2', name: 'Paneer Chilly Gravy', price: 220, category: 'STARTERS', isVeg: true, description: 'Soft paneer cubes in a savory, thick, spicy Chinese gravy.' },
  { id: 's3', name: 'Mushroom Chilly Dry', price: 229, category: 'STARTERS', isVeg: true, description: 'Fresh crispy button mushrooms tossed with spicy green chilies and garlic.' },
  { id: 's4', name: 'Mushroom Chilly Gravy', price: 229, category: 'STARTERS', isVeg: true, description: 'Mouth-watering mushroom bits simmered in hot and spicy gravy.' },
  { id: 's5', name: 'Veg Manchurian Dry', price: 180, category: 'STARTERS', isVeg: true, description: 'Crispy deep-fried mixed vegetable balls tossed in rich tang soy sauce.' },
  { id: 's6', name: 'Veg Manchurian Gravy', price: 180, category: 'STARTERS', isVeg: true, description: 'Vegetable dumplings drenched in a classic dark savory Manchurian gravy.' },
  { id: 's7', name: 'Crispy Baby Corn', price: 220, category: 'STARTERS', isVeg: true, isPopular: true, description: 'Golden tender baby corn spears fried and seasoned with chef\'s special spices.' },
  { id: 's8', name: 'Crispy Sweet Corn', price: 149, category: 'STARTERS', isVeg: true, description: 'Crisp-fried juicy sweet corn kernels seasoned with lime and pepper.' },
  { id: 's9', name: 'Chicken 65', price: 220, category: 'STARTERS', isVeg: false, isPopular: true, description: 'Spicy, deep-fried chicken cubes seasoned with curry leaves and southern spices.' },
  { id: 's10', name: 'Chicken Lollipop', price: 279, category: 'STARTERS', isVeg: false, description: 'Crispy marinated chicken drumettes shaped into lollipops, fried golden.' },
  { id: 's11', name: 'Laccha Paratha', price: 25, category: 'STARTERS', isVeg: true, description: 'Crisp layered Indian flatbread made of whole wheat.' },
  { id: 's12', name: 'Masala Papad', price: 25, category: 'STARTERS', isVeg: true, description: 'Crispy fried papad topped with spicy chopped onions, tomatoes, and herbs.' },

  // PIZZA
  { id: 'p1', name: 'Vegetarian Pizza', price: '₹139 / ₹169', price8: 139, price10: 169, category: 'PIZZA', isVeg: true, description: 'Freshly baked cheese pizza loaded with classic mixed farm veggies.' },
  { id: 'p2', name: 'Onion Pizza', price: '₹139 / ₹169', price8: 139, price10: 169, category: 'PIZZA', isVeg: true, description: 'Aromatic red onion slices on top of bubbly mozzarella and signature tomato sauce.' },
  { id: 'p3', name: 'Capsicum Pizza', price: '₹139 / ₹169', price8: 139, price10: 169, category: 'PIZZA', isVeg: true, description: 'Crispy green bell peppers embedded in a thick cheesy hot layer.' },
  { id: 'p4', name: 'Cheese Corn Pizza', price: '₹159 / ₹189', price8: 159, price10: 189, category: 'PIZZA', isVeg: true, isPopular: true, description: 'Sweet golden corn kernels layered with heavy, stretching double mozzarella.' },
  { id: 'p5', name: 'Paneer Veg Pizza', price: '₹169 / ₹229', price8: 169, price10: 229, category: 'PIZZA', isVeg: true, isPopular: true, description: 'Tender cottage cheese cubes and mixed garden vegetables on a premium base.' },
  { id: 'p6', name: 'Chicken Pizza', price: '₹199 / ₹279', price8: 199, price10: 279, category: 'PIZZA', isVeg: false, description: 'Sizzling tandoori chicken chunks, rich cheese blend, and robust seasoning.' },

  // BURGERS & SIDES
  { id: 'b1', name: 'Aloo Tikki Burger', price: 79, category: 'BURGERS & SIDES', isVeg: true, description: 'Crispy spiced potato patty with house sauce, lettuce, and onions.' },
  { id: 'b2', name: 'Aloo Tikki Cheese Burger', price: 89, category: 'BURGERS & SIDES', isVeg: true, isPopular: true, description: 'Our potato tikki burger loaded with a rich melting slice of cheese.' },
  { id: 'b3', name: 'Paneer Burger', price: 99, category: 'BURGERS & SIDES', isVeg: true, description: 'Satisfying burger featuring a golden crispy paneer slab with spicy dressings.' },
  { id: 'b4', name: 'Chicken Burger', price: 119, category: 'BURGERS & SIDES', isVeg: false, description: 'Juicy, seasoned chicken patty fried to golden perfection with creamy mayo.' },
  { id: 'b5', name: 'French Fries', price: 79, category: 'BURGERS & SIDES', isVeg: true, description: 'Crispy salted golden potato fries served with dynamic dip.' },
  { id: 'b6', name: 'Peri Peri Fries', price: 89, category: 'BURGERS & SIDES', isVeg: true, isPopular: true, description: 'Crisp golden french fries tossed in fiery, tangy African peri-peri dust.' },

  // GRILLED SANDWICHES
  { id: 'gs1', name: 'Vegetarian Grilled Sandwich', price: 79, category: 'GRILLED SANDWICHES', isVeg: true, description: 'Toasted crisp bread filled with fresh buttered cucumber, tomato, and green chutney.' },
  { id: 'gs2', name: 'Paneer Grilled Sandwich', price: 99, category: 'GRILLED SANDWICHES', isVeg: true, isPopular: true, description: 'Spiced shredded paneer core inside hot pressed golden-crusted breads.' },
  { id: 'gs3', name: 'Chicken Grilled Sandwich', price: 119, category: 'GRILLED SANDWICHES', isVeg: false, description: 'Roasted seasoned chicken strips, cheese, and spicy mayo grilled till warm.' },

  // NOODLES
  { id: 'n1', name: 'Veg Noodles', price: '₹60 / ₹109', halfPrice: 60, fullPrice: 109, category: 'NOODLES', isVeg: true, description: 'Wok-tossed hakka style noodles with fresh julienned seasonal veggies.' },
  { id: 'n2', name: 'Paneer Noodles', price: '₹79 / ₹159', halfPrice: 79, fullPrice: 159, category: 'NOODLES', isVeg: true, description: 'Delightful noodles loaded with paneer chunks and fresh Chinese seasonings.' },
  { id: 'n3', name: 'Egg Noodles', price: '₹75 / ₹149', halfPrice: 75, fullPrice: 149, category: 'NOODLES', isVeg: false, description: 'Savory stir-fried noodles with rich scrambled eggs and cabbage.' },
  { id: 'n4', name: 'Chicken Noodles', price: '₹90 / ₹179', halfPrice: 90, fullPrice: 179, category: 'NOODLES', isVeg: false, isPopular: true, description: 'Fragrant and savory noodles stir-fried with juicy shredded chicken pieces.' },

  // PASTA & MAGGI
  { id: 'ps1', name: 'Red Sauce Pasta', price: 80, category: 'PASTA & MAGGI', isVeg: true, description: 'Penne pasta tossed in an aromatic, slow-simmered tangy tomato-basil sauce.' },
  { id: 'ps2', name: 'White Sauce Pasta', price: 100, category: 'PASTA & MAGGI', isVeg: true, isPopular: true, description: 'Rich, velvety, and creamy cheese-laden white sauce over perfectly al dente penne.' },
  { id: 'm1', name: 'Veg Paneer Maggi', price: 70, category: 'PASTA & MAGGI', isVeg: true, isPopular: true, description: 'Everyone\'s favorite instant comfort noodles cooked with fresh veggies and paneer cubes.' },

  // RICE
  { id: 'r1', name: 'Veg Fried Rice', price: 129, category: 'RICE', isVeg: true, description: 'Fluffy long grain basmati rice stir-fried with farm vegetables and light soy.' },
  { id: 'r2', name: 'Egg Fried Rice', price: 149, category: 'RICE', isVeg: false, description: 'Stir-fried rice loaded with rich scrambled eggs and aromatic garlic.' },
  { id: 'r3', name: 'Paneer Fried Rice', price: 179, category: 'RICE', isVeg: true, description: 'Premium fried rice loaded with butter-tossed soft cottage cheese.' },
  { id: 'r4', name: 'Chicken Fried Rice', price: 229, category: 'RICE', isVeg: false, isPopular: true, description: 'Fragrant wok fried rice containing succulent marinated chicken chunks.' },

  // MOMOS (6 Pcs)
  { id: 'mo1', name: 'Veg Steam Momo', price: 69, category: 'MOMOS', isVeg: true, description: 'Delicate steamed dumplings stuffed with finely minced seasoned vegetables.' },
  { id: 'mo2', name: 'Veg Fried Momo', price: 79, category: 'MOMOS', isVeg: true, description: 'Crispy deep-fried golden vegetable momos served with spicy red chutney.' },
  { id: 'mo3', name: 'Veg Kurkure Momo', price: 89, category: 'MOMOS', isVeg: true, isPopular: true, description: 'Crunchy outer breadcrumb-coated fried momos with a delicious vegetable center.' },
  { id: 'mo4', name: 'Paneer Steam Momo', price: 79, category: 'MOMOS', isVeg: true, description: 'Traditional steamed momos filled with succulent spiced cottage cheese.' },
  { id: 'mo5', name: 'Paneer Fried Momo', price: 89, category: 'MOMOS', isVeg: true, description: 'Deep fried crispy paneer momos accompanied by hot schezwan sauce.' },
  { id: 'mo6', name: 'Paneer Kurkure Momo', price: 109, category: 'MOMOS', isVeg: true, isPopular: true, description: 'Ultimate crunch cornflake-crusted momos filled with seasoned paneer.' },

  // ROLLS & SPRING ROLLS
  { id: 'ro1', name: 'Veg Roll', price: 79, category: 'ROLLS & SPRING ROLLS', isVeg: true, description: 'Warm paratha wrap stuffed with sautéed green veggies, lime, and chat masala.' },
  { id: 'ro2', name: 'Double Egg Roll', price: 89, category: 'ROLLS & SPRING ROLLS', isVeg: false, description: 'Flaky paratha coated with two layers of beaten egg, loaded with crunchy onions.' },
  { id: 'ro3', name: 'Paneer Roll', price: 99, category: 'ROLLS & SPRING ROLLS', isVeg: true, isPopular: true, description: 'Satisfying cottage cheese wrap with robust spices and dynamic sauces.' },
  { id: 'ro4', name: 'Chicken Roll', price: 119, category: 'ROLLS & SPRING ROLLS', isVeg: false, description: 'Warmed roll wrapped around roasted juicy chicken pieces and tangy dressings.' },
  { id: 'ro5', name: '2 Egg Chicken Roll', price: 129, category: 'ROLLS & SPRING ROLLS', isVeg: false, description: 'The absolute royal wrap loaded with double scrambled egg layer and chicken chunks.' },
  { id: 'sr1', name: 'Veg Spring Roll', price: 49, category: 'ROLLS & SPRING ROLLS', isVeg: true, description: 'Super crisp, golden fried pastry skin packed with authentic Chinese stir fry veggies.' },
  { id: 'sr2', name: 'Paneer Spring Roll', price: 59, category: 'ROLLS & SPRING ROLLS', isVeg: true, description: 'Crisp golden rolls packed with a delightful mixture of paneer and cabbage.' },

  // SHAKES
  { id: 'sh1', name: 'Vanilla Shake', price: 99, category: 'SHAKES', isVeg: true, description: 'Smooth, creamy classic shake made with pure vanilla bean gelato.' },
  { id: 'sh2', name: 'Strawberry Shake', price: 99, category: 'SHAKES', isVeg: true, description: 'Dreamy pink shake blended with rich sweet strawberry pulp.' },
  { id: 'sh3', name: 'Oreo Shake', price: 109, category: 'SHAKES', isVeg: true, isPopular: true, description: 'Chilled cream shake blended with crispy Oreo biscuits and chocolate drizzle.' },
  { id: 'sh4', name: 'Kit Kat Shake', price: 109, category: 'SHAKES', isVeg: true, description: 'Chilled premium shake infused with crunchy chocolatey Kit Kat chunks.' },
  { id: 'sh5', name: 'Chocolate Shake', price: 109, category: 'SHAKES', isVeg: true, description: 'Rich, deep chocolate syrup and cream blended into pure comfort.' },
  { id: 'sh6', name: 'Banana Shake', price: 99, category: 'SHAKES', isVeg: true, description: 'Nutritious ripe banana shake whipped with thick cold milk.' },
  { id: 'sh7', name: 'Mango Shake', price: 109, category: 'SHAKES', isVeg: true, description: 'Tropical summer highlight shake made from rich, aromatic mango pulp.' },
  { id: 'sh8', name: 'Pineapple Shake', price: 109, category: 'SHAKES', isVeg: true, description: 'Exotic tangy sweet shake blended with fresh golden pineapple cubes.' },

  // MOCKTAILS
  { id: 'mct1', name: 'Virgin Mojito', price: 99, category: 'MOCKTAILS', isVeg: true, isPopular: true, description: 'Super refreshing muddled fresh mint leaves, lime slices, sugar, and sparkling soda.' },
  { id: 'mct2', name: 'Strawberry Cooler', price: 99, category: 'MOCKTAILS', isVeg: true, description: 'Tangy-sweet fizzy mocktail made with fresh strawberries and active lime.' },
  { id: 'mct3', name: 'Green Apple Fizz', price: 99, category: 'MOCKTAILS', isVeg: true, description: 'Crisp, tart green apple syrup blended with chilled soda and ice.' },
  { id: 'mct4', name: 'Blue Lagoon', price: 99, category: 'MOCKTAILS', isVeg: true, isPopular: true, description: 'Stunning bright blue mocktail with Curacao flavor, lemon juice, and active fizz.' },
  { id: 'mct5', name: 'Watermelon Mojito', price: 99, category: 'MOCKTAILS', isVeg: true, description: 'Muddled fresh mint and sparkling soda infused with sweet watermelon notes.' },
  { id: 'mct6', name: 'Blood Orange Splash', price: 89, category: 'MOCKTAILS', isVeg: true, description: 'Exotic citrus mocktail featuring deep crimson blood orange flavor and lemon.' },
  { id: 'mct7', name: 'Black Currant Splash', price: 89, category: 'MOCKTAILS', isVeg: true, description: 'Deep purple tangy sweet soda mocktail bursting with rich blackcurrant berry juices.' },
];

export default function App() {
  // Mobile Navbar State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Menu Filtering States
  const [selectedCategory, setSelectedCategory] = useState<string>('TEA');
  const [menuSearchQuery, setMenuSearchQuery] = useState<string>('');

  // Carousel Navigation index
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Reservation Form State
  const [reservationName, setReservationName] = useState('');
  const [reservationPhone, setReservationPhone] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [reservationGuests, setReservationGuests] = useState('2');
  const [reservationMessage, setReservationMessage] = useState('');
  const [isReservedSuccessfully, setIsReservedSuccessfully] = useState(false);

  // Highlight Categories for the "Our Categories" sidebar
  const categoriesList = [
    { name: 'TEA', label: 'Zafrani & Specialty Teas', count: 5, icon: '☕' },
    { name: 'COFFEE', label: 'Premium Roasted Brews', count: 12, icon: '🥛' },
    { name: 'PIZZA', label: 'Gourmet Pizzas (8" & 10")', count: 6, icon: '🍕' },
    { name: 'BURGERS & SIDES', label: 'Crispy Burgers & Fries', count: 6, icon: '🍔' },
    { name: 'MOMOS', label: 'Kurkure, Steam & Fried Momos', count: 6, icon: '🥟' },
    { name: 'MOCKTAILS', label: 'Refreshing Coolers', count: 7, icon: '🍹' },
  ];

  // Signature slide items
  const signatureItems = useMemo(() => {
    return MENU_DATA.filter(item => item.isPopular).slice(0, 6);
  }, []);

  const handleNextSignature = () => {
    setCarouselIndex((prev) => (prev + 1) % signatureItems.length);
  };

  const handlePrevSignature = () => {
    setCarouselIndex((prev) => (prev - 1 + signatureItems.length) % signatureItems.length);
  };

  // Filter Menu Data
  const filteredMenuItems = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) || 
                            item.description?.toLowerCase().includes(menuSearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, menuSearchQuery]);

  // Handle Menu Item Click to pre-fill reservation form and smooth scroll
  const handleQuickReserveItem = (itemName: string) => {
    setReservationMessage(`I would love to reserve a table and order the delicious "${itemName}"!`);
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Submit Reservation to WhatsApp
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationName || !reservationPhone || !reservationDate || !reservationTime) {
      alert("Please fill out all required fields to secure your table.");
      return;
    }

    const whatsappNumber = "07250433674"; // The Coffee Clock real phone number
    const formattedMessage = encodeURIComponent(
      `Hello The Coffee Clock! I would like to make a table reservation:\n\n` +
      `🕒 Name: ${reservationName}\n` +
      `📞 Phone: ${reservationPhone}\n` +
      `📅 Date: ${reservationDate}\n` +
      `⏰ Time: ${reservationTime}\n` +
      `👥 Guests: ${reservationGuests} People\n` +
      `💬 Message: ${reservationMessage || 'No special requests'}\n\n` +
      `Looking forward to a wonderful dining experience!`
    );

    const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${formattedMessage}`;
    
    setIsReservedSuccessfully(true);
    
    // Automatically open WhatsApp message window
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsReservedSuccessfully(false);
      // Reset form
      setReservationName('');
      setReservationPhone('');
      setReservationDate('');
      setReservationTime('');
      setReservationGuests('2');
      setReservationMessage('');
    }, 1500);
  };

  // Interactive review list
  const reviewsData = [
    { name: "Harsh Vardhan", rating: 5, date: "2 weeks ago", text: "Exceptional service, great music, and a wonderful vibe overall. The Zafrani Chai is absolutely fantastic!" },
    { name: "Rahul Kumar", rating: 5, date: "1 month ago", text: "Great food super quality ❤️ paneer pizza and white sauce pasta were outstanding. The atmosphere is very warm." },
    { name: "Amit Singh", rating: 5, date: "3 weeks ago", text: "Good service brother! Very cozy place to hang out with friends. Best cafe in Arrah for couples and families alike." },
    { name: "Priya Sharma", rating: 5, date: "2 months ago", text: "Amazing shakes and Kurkure Momos. Loved the aesthetic interior and comfortable seating. Will visit again soon!" }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C2520] font-sans antialiased selection:bg-[#C5A880] selection:text-white">
      
      {/* ----------------- TOP NAV CONTRACT ----------------- */}
      <header className="sticky top-0 z-50 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#2C2520]/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Zone 1: Brand title/wordmark */}
          <a href="#home" className="flex items-center gap-2 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#1E1A17] flex items-center justify-center text-[#C5A880] shadow-sm">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-lg tracking-wider font-bold text-[#1E1A17] uppercase">
                The Coffee Clock
              </span>
              <span className="text-[9px] tracking-widest text-[#D86A4F] uppercase font-semibold font-sans">
                Sip The Moment
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (4-6 links) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="text-[#1E1A17] hover:text-[#D86A4F] transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#D86A4F] after:transition-all">
              Home
            </a>
            <a href="#menu" className="text-[#2C2520]/80 hover:text-[#D86A4F] transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#D86A4F] after:transition-all">
              Menu
            </a>
            <a href="#about" className="text-[#2C2520]/80 hover:text-[#D86A4F] transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#D86A4F] after:transition-all">
              About
            </a>
            <a href="#experience" className="text-[#2C2520]/80 hover:text-[#D86A4F] transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#D86A4F] after:transition-all">
              Experience
            </a>
            <a href="#reviews" className="text-[#2C2520]/80 hover:text-[#D86A4F] transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#D86A4F] after:transition-all">
              Reviews
            </a>
            <a href="#location" className="text-[#2C2520]/80 hover:text-[#D86A4F] transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#D86A4F] after:transition-all">
              Location
            </a>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#reservation" 
              className="px-5 py-2.5 bg-[#D86A4F] text-white rounded-full font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#C0583E] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all whitespace-nowrap"
            >
              Reserve a Table
            </a>
          </div>

          {/* Mobile menu trigger button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#1E1A17] hover:bg-[#1E1A17]/5 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#FAF7F2] border-b border-[#2C2520]/10 py-6 px-4 shadow-xl flex flex-col gap-4 animate-fadeIn">
            <a 
              href="#home" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#1E1A17] py-2 border-b border-[#2C2520]/5"
            >
              Home
            </a>
            <a 
              href="#menu" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#2C2520]/80 py-2 border-b border-[#2C2520]/5"
            >
              Menu Catalog
            </a>
            <a 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#2C2520]/80 py-2 border-b border-[#2C2520]/5"
            >
              Our Story
            </a>
            <a 
              href="#experience" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#2C2520]/80 py-2 border-b border-[#2C2520]/5"
            >
              The Experience
            </a>
            <a 
              href="#reviews" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#2C2520]/80 py-2 border-b border-[#2C2520]/5"
            >
              Guest Reviews
            </a>
            <a 
              href="#location" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-semibold text-[#2C2520]/80 py-2 border-b border-[#2C2520]/5"
            >
              Find Us
            </a>
            <a 
              href="#reservation" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-3 bg-[#D86A4F] text-white rounded-xl text-center font-bold uppercase text-xs tracking-wider shadow-sm"
            >
              Reserve a Table
            </a>
          </div>
        )}
      </header>

      {/* ----------------- HERO SECTION ----------------- */}
      <section id="home" className="relative pt-8 pb-16 md:py-24 overflow-hidden">
        {/* Background visual geometry */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#C5A880]/10 blur-3xl -z-10" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] rounded-full bg-[#D86A4F]/5 blur-2xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6">
              
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#D86A4F]"></span>
                <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase font-sans">
                  SIP THE MOMENT • EVERY SECOND COUNTS
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1E1A17] leading-[1.1] text-wrap-balance">
                Where Every <span className="text-[#D86A4F] italic font-serif">Second</span> Counts & Every <span className="text-[#C5A880] italic font-serif">Cup</span> Inspires.
              </h1>

              <p className="text-[#2C2520]/75 text-base sm:text-lg max-w-xl leading-relaxed">
                The Coffee Clock is a premium sanctuary in Arrah, Bihar. Enjoy handcrafted saffron Zafrani Chai, freshly ground aromatic espresso brews, steaming Kurkure Momos, and brick-oven style gourmet pizzas in a warm, comfortable space designed for great conversations.
              </p>

              {/* Stats highlights block strictly unboxed */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#2C2520]/80 border-y border-[#1E1A17]/10 py-3 w-full max-w-lg">
                <div className="flex items-center gap-1.5 font-semibold">
                  <Star className="w-4 h-4 fill-[#D86A4F] text-[#D86A4F]" />
                  <span>4.9 Star Rating</span>
                </div>
                <span className="text-[#2C2520]/20 font-light">|</span>
                <span>70+ Real Reviews</span>
                <span className="text-[#2C2520]/20 font-light">|</span>
                <span>₹200–400 average cost</span>
                <span className="text-[#2C2520]/20 font-light">|</span>
                <span>Cafe & Restaurant</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a 
                  href="#menu" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#1E1A17] text-white rounded-full font-bold text-sm tracking-wider uppercase shadow-md hover:bg-[#342D28] hover:-translate-y-0.5 transition-all text-center"
                >
                  Explore Our Menu
                </a>
                <a 
                  href="#reservation" 
                  className="w-full sm:w-auto px-8 py-3.5 bg-white border border-[#2C2520]/15 text-[#1E1A17] rounded-full font-bold text-sm tracking-wider uppercase shadow-sm hover:bg-[#FAF7F2] hover:border-[#1E1A17] hover:-translate-y-0.5 transition-all text-center"
                >
                  Reserve a Table
                </a>
              </div>

              {/* Floating tags */}
              <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-[#1E1A17]/70">
                <span className="flex items-center gap-1 bg-[#1E1A17]/5 px-3 py-1.5 rounded-full">🌿 100% Freshly Prepared</span>
                <span className="flex items-center gap-1 bg-[#1E1A17]/5 px-3 py-1.5 rounded-full">⏰ Absolute Warm Amience</span>
              </div>
            </div>

            {/* Right Column Layout: Overlapping Circular Design mimicking image.png */}
            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-[420px] sm:h-[420px]">
                
                {/* Yellow circular decorative background mimicking pizza-girl backdrop */}
                <div className="absolute inset-0 rounded-full bg-[#E9D9BF] scale-95" />
                
                {/* Actual cup and pocketwatch generated image inside the circle */}
                <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                  <img 
                    src={mediaConfig.heroImageUrl} 
                    alt="The Coffee Clock Premium Espresso Cup and Pocket Watch" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>

                {/* Overlapping badge: 20% Off or similar (non-delivery) */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#D86A4F] text-white flex flex-col items-center justify-center rotate-12 shadow-lg border-2 border-white animate-bounce">
                  <span className="text-[10px] tracking-widest uppercase font-bold">Premium</span>
                  <span className="text-xl font-display font-black">100%</span>
                  <span className="text-[9px] font-bold uppercase text-white/80">Quality</span>
                </div>

                {/* Overlay card bottom-left mimicking "Fast Delivery" card in image.png, but themed for premium café */}
                <div className="absolute bottom-6 -left-8 bg-white p-3.5 rounded-2xl shadow-xl border border-[#2C2520]/5 max-w-[180px] hidden sm:block">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-[#FAF7F2] rounded-lg text-[#D86A4F]">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1E1A17]">Gourmet Brews</h4>
                      <p className="text-[10px] text-[#2C2520]/60 mt-0.5 leading-tight">Authentic spices and single-origin coffee beans.</p>
                    </div>
                  </div>
                </div>

                {/* Overlay card bottom-right mimicking "Pick Up" card */}
                <div className="absolute bottom-24 -right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#2C2520]/5 max-w-[170px] hidden sm:block">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-[#FAF7F2] rounded-lg text-[#C5A880]">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#1E1A17]">Cherished Moments</h4>
                      <p className="text-[10px] text-[#2C2520]/60 mt-0.5 leading-tight">Come relax, work, and meet in peace.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- FEATURED SIGNATURES SLIDER ----------------- */}
      <section className="py-12 bg-white border-y border-[#2C2520]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Something for Every Craving</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-[#1E1A17]">Signature Specialties</h2>
            </div>
            <div className="flex items-center gap-3 mt-4 md:mt-0">
              <button 
                onClick={handlePrevSignature}
                className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#2C2520]/10 flex items-center justify-center text-[#1E1A17] hover:bg-[#D86A4F] hover:text-white hover:border-[#D86A4F] active:scale-95 transition-all shadow-sm"
                aria-label="Previous signature item"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={handleNextSignature}
                className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#2C2520]/10 flex items-center justify-center text-[#1E1A17] hover:bg-[#D86A4F] hover:text-white hover:border-[#D86A4F] active:scale-95 transition-all shadow-sm"
                aria-label="Next signature item"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop/Tablet Signature Cards Layout (shows 3 at once) */}
          <div className="hidden md:grid grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const itemIndex = (carouselIndex + offset) % signatureItems.length;
              const item = signatureItems[itemIndex];
              
              // Get appropriate image based on product categories
              let displayImg = mediaConfig.chaiUrl;
              if (item.category === "COFFEE") displayImg = mediaConfig.heroImageUrl;
              if (item.category === "PIZZA") displayImg = mediaConfig.menuPizzaUrl;
              if (item.category === "SHAKES") displayImg = mediaConfig.menuShakeUrl;
              
              return (
                <div key={item.id} className="bg-[#FAF7F2] rounded-3xl p-6 relative border border-[#2C2520]/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between group">
                  <div>
                    {/* Circle dish image container mimicking image.png */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto -mt-16 mb-4 border-4 border-white shadow-md bg-white">
                      <img 
                        src={displayImg} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded ${item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isVeg ? '● VEG' : '● NON-VEG'}
                      </span>
                      <div className="flex items-center gap-1 text-[#D86A4F] text-xs font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>4.9</span>
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#1E1A17]">{item.name}</h3>
                    <p className="text-xs text-[#2C2520]/65 mt-1 line-clamp-2 min-h-[32px]">{item.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2C2520]/5 flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#D86A4F]">₹{item.price}</span>
                    <button 
                      onClick={() => handleQuickReserveItem(item.name)}
                      className="px-4 py-1.5 bg-[#1E1A17] text-white text-[11px] font-bold tracking-wider uppercase rounded-full hover:bg-[#D86A4F] transition-colors"
                    >
                      Reserve Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Signature Card Layout (shows 1 card with slider swipe markers) */}
          <div className="md:hidden">
            {(() => {
              const item = signatureItems[carouselIndex];
              let displayImg = mediaConfig.chaiUrl;
              if (item.category === "COFFEE") displayImg = mediaConfig.heroImageUrl;
              if (item.category === "PIZZA") displayImg = mediaConfig.menuPizzaUrl;
              if (item.category === "SHAKES") displayImg = mediaConfig.menuShakeUrl;

              return (
                <div className="bg-[#FAF7F2] rounded-3xl p-6 relative border border-[#2C2520]/5 shadow-sm flex flex-col items-center text-center">
                  <div className="w-36 h-36 rounded-full overflow-hidden -mt-16 mb-4 border-4 border-white shadow-md bg-white">
                    <img 
                      src={displayImg} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded mb-2 ${item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.isVeg ? '● VEG' : '● NON-VEG'}
                  </span>

                  <h3 className="font-display font-bold text-lg text-[#1E1A17]">{item.name}</h3>
                  <p className="text-xs text-[#2C2520]/65 mt-1 max-w-sm">{item.description}</p>
                  
                  <div className="text-lg font-mono font-bold text-[#D86A4F] mt-3">₹{item.price}</div>
                  
                  <button 
                    onClick={() => handleQuickReserveItem(item.name)}
                    className="mt-4 px-6 py-2 bg-[#D86A4F] text-white text-xs font-bold tracking-wider uppercase rounded-full w-full"
                  >
                    Quick Reserve Spot
                  </button>
                </div>
              );
            })()}
            
            {/* Dots indicators */}
            <div className="flex justify-center gap-1.5 mt-4">
              {signatureItems.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-1.5 rounded-full transition-all ${idx === carouselIndex ? 'w-5 bg-[#D86A4F]' : 'w-1.5 bg-[#2C2520]/25'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- TASTY BURGER & CATEGORIES HIGHLIGHT GRID ----------------- */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side grid: Premium banner visual mimicking image.png left side */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              
              {/* Box 1: Tasty Burger Banner */}
              <div className="col-span-2 relative h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-[#E07A5F] to-[#D86A4F] p-8 text-white flex flex-col justify-between group shadow-md">
                <div className="absolute top-0 right-0 w-44 h-44 -mr-8 -mt-8 rounded-full bg-white/10 blur-xl" />
                
                <div className="z-10">
                  <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-1 rounded-full">New Recipe</span>
                  <h3 className="font-display text-2xl font-extrabold mt-3 tracking-wide">TASTY & JUICY BURGERS</h3>
                  <p className="text-xs text-white/80 mt-1.5 max-w-xs">Handcrafted paneer, crisp aloo tikki, and sizzling chicken patties with signature spreads.</p>
                </div>
                
                <div className="z-10 flex items-center justify-between mt-4">
                  <span className="font-mono text-sm font-bold">Starting ₹79</span>
                  <a href="#menu" className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase border-b border-white pb-0.5 hover:text-white/80 transition-all">
                    Browse Burgers <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Box 2: Shakes Banner */}
              <div className="relative h-48 rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#2C2520]/10 p-5 flex flex-col justify-between group shadow-sm">
                <div className="absolute inset-0 bg-[#C5A880]/10 group-hover:scale-105 transition-transform duration-500" />
                <div className="z-10">
                  <span className="text-[9px] font-bold tracking-wider text-[#C5A880] uppercase">Rich Decadence</span>
                  <h4 className="font-display font-bold text-base text-[#1E1A17] mt-1">Kit Kat & Oreo Shakes</h4>
                </div>
                <div className="z-10 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#D86A4F]">₹109 Each</span>
                  <span className="text-[10px] text-[#1E1A17]/60 font-semibold group-hover:underline">Explore</span>
                </div>
              </div>

              {/* Box 3: Tea Craft Banner */}
              <div className="relative h-48 rounded-3xl overflow-hidden bg-[#FAF7F2] border border-[#2C2520]/10 p-5 flex flex-col justify-between group shadow-sm">
                <div className="absolute inset-0 bg-[#E07A5F]/5 group-hover:scale-105 transition-transform duration-500" />
                <div className="z-10">
                  <span className="text-[9px] font-bold tracking-wider text-[#D86A4F] uppercase">Best Seller</span>
                  <h4 className="font-display font-bold text-base text-[#1E1A17] mt-1">Authentic Saffron Chai</h4>
                </div>
                <div className="z-10 flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#D86A4F]">₹35 Only</span>
                  <span className="text-[10px] text-[#1E1A17]/60 font-semibold group-hover:underline">Explore</span>
                </div>
              </div>

            </div>

            {/* Right side: Categories sidebar list mimicking image.png right side */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">The Culinary Grid</span>
                <h2 className="font-display text-3xl font-bold mt-1 text-[#1E1A17]">Our Categories</h2>
                <p className="text-[#2C2520]/75 text-sm mt-2 max-w-md">
                  Browse through our professionally structured categories, using authentic recipes carefully guarded and perfected by our master kitchen team.
                </p>
              </div>

              <div className="space-y-3.5">
                {categoriesList.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      setSelectedCategory(category.name);
                      const element = document.getElementById('menu-section');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-white p-4 rounded-2xl border border-[#2C2520]/5 shadow-sm hover:shadow-md hover:border-[#C5A880] transition-all flex items-center justify-between group text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#FAF7F2] group-hover:bg-[#D86A4F]/10 flex items-center justify-center text-lg transition-colors">
                        {category.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#1E1A17] group-hover:text-[#D86A4F] transition-colors">{category.label}</h4>
                        <p className="text-[11px] text-[#2C2520]/60 mt-0.5">{category.count} authentic recipes available</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#2C2520]/50 font-bold group-hover:text-[#D86A4F] transition-all">
                      <span>Browse</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- STORY / ABOUT ("Get Started Today!") ----------------- */}
      <section id="about" className="py-16 md:py-24 bg-white border-y border-[#2C2520]/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Where Every Moment Tastes Better</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1E1A17] leading-tight text-wrap-balance">
                Our Story: Coffee, Conversations & Beautiful Connections.
              </h2>
              
              <div className="space-y-4 text-sm text-[#2C2520]/85 leading-relaxed">
                <p>
                  Conveniently situated right at <strong className="text-[#1E1A17]">UDAI HOSPITAL PUL on Station Road in Arrah</strong>, The Coffee Clock was founded on a simple philosophy: <em className="text-[#D86A4F] font-serif">“Sip the moment, every second counts.”</em> We noticed the hustle of daily life in Bihar and wanted to create a welcoming rest point where time slows down.
                </p>
                <p>
                  We are not just a menu card; we are a complete social environment. Whether you are grabbing a local favorite Zafrani Chai to power your day, hosting a family dinner with our savory paneer pizzas and sizzlers, or studying in comfort with a classic Hazelnut cold coffee, our space is open with genuine warmth.
                </p>
              </div>

              {/* Service cards style mimicking bottom-left of pizza girl in image.png */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2C2520]/5">
                  <div className="w-8 h-8 rounded-full bg-[#D86A4F]/10 flex items-center justify-center text-[#D86A4F] mb-3">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-[#1E1A17] uppercase">Premium Food</h4>
                  <p className="text-[11px] text-[#2C2520]/65 mt-1 leading-normal">Prepared fresh in hygienic kitchens with high-quality spices.</p>
                </div>

                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#2C2520]/5">
                  <div className="w-8 h-8 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs text-[#1E1A17] uppercase">Cozy Vibe</h4>
                  <p className="text-[11px] text-[#2C2520]/65 mt-1 leading-normal">Mellow background music, air-conditioned space, and warm lights.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Perfect Yellow backdrop with joyful circle image */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-72 h-72 sm:w-[400px] sm:h-[400px]">
                
                {/* Yellow background circle matching original image.png styling */}
                <div className="absolute inset-0 rounded-full bg-[#FAF1D6] scale-95" />
                
                {/* Circular image border */}
                <div className="absolute inset-3 rounded-full overflow-hidden border-4 border-white shadow-xl bg-slate-100">
                  <img 
                    src={mediaConfig.cafeMomentUrl} 
                    alt="A customer happily enjoying food inside the warm ambience of The Coffee Clock" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                {/* Little decorative illustration sticker to match original design */}
                <div className="absolute -bottom-2 right-6 bg-white py-1.5 px-3 rounded-full shadow-md text-[10px] font-bold border border-yellow-200 text-yellow-700 animate-pulse">
                  🍕 Best Paneer Pizza in Town
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- EXPERIENCE CORNER ----------------- */}
      <section id="experience" className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Beyond The Mug</span>
            <h2 className="font-display text-3xl font-bold text-[#1E1A17]">The Coffee Clock Experience</h2>
            <p className="text-sm text-[#2C2520]/75">We serve happiness in every single cup and plate, prepared with utmost care and absolute sanitation standards.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2520]/5 shadow-sm text-center space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mx-auto">
                <Coffee className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-wide text-[#1E1A17] uppercase">Premium Coffee & Tea</h3>
              <p className="text-xs text-[#2C2520]/70 leading-relaxed">From robust single-origin filter coffees to traditional aromatic saffron Zafrani Chai.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2520]/5 shadow-sm text-center space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-[#D86A4F]/10 flex items-center justify-center text-[#D86A4F] mx-auto">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-wide text-[#1E1A17] uppercase">Gourmet Snacks</h3>
              <p className="text-xs text-[#2C2520]/70 leading-relaxed">Delicious fresh-to-order pizzas, crispy grilled sandwiches, and delicious local rolls.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2520]/5 shadow-sm text-center space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-wide text-[#1E1A17] uppercase">100% Hygiene</h3>
              <p className="text-xs text-[#2C2520]/70 leading-relaxed">Strict cleanliness standards in cooking, handling, and presentation for your wellbeing.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-3xl border border-[#2C2520]/5 shadow-sm text-center space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mx-auto">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-wide text-[#1E1A17] uppercase">Comfortable Environment</h3>
              <p className="text-xs text-[#2C2520]/70 leading-relaxed">Cozy seating, perfect lighting, and positive music for unforgettable moments.</p>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- TOP FOODS OVERVIEW SECTION (mimicking image.png) ----------------- */}
      <section className="py-12 bg-white border-y border-[#2C2520]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Quick Shortcuts</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1E1A17]">Explore Sizzling Cravings</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            
            {/* Category Item 1 */}
            <button 
              onClick={() => {
                setSelectedCategory('PIZZA');
                const element = document.getElementById('menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#2C2520]/5 hover:border-[#D86A4F] transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-md group text-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={mediaConfig.menuPizzaUrl} 
                  alt="Gourmet Pizzas" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E1A17]">Gourmet Pizzas</h4>
                <p className="text-[10px] text-[#2C2520]/50 mt-0.5">Customizable in 8" & 10"</p>
              </div>
            </button>

            {/* Category Item 2 */}
            <button 
              onClick={() => {
                setSelectedCategory('COFFEE');
                const element = document.getElementById('menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#2C2520]/5 hover:border-[#D86A4F] transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-md group text-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={mediaConfig.heroImageUrl} 
                  alt="Premium Coffees" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E1A17]">Roasted Coffee</h4>
                <p className="text-[10px] text-[#2C2520]/50 mt-0.5">Classic hot & cold options</p>
              </div>
            </button>

            {/* Category Item 3 */}
            <button 
              onClick={() => {
                setSelectedCategory('SHAKES');
                const element = document.getElementById('menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#2C2520]/5 hover:border-[#D86A4F] transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-md group text-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={mediaConfig.menuShakeUrl} 
                  alt="Rich Shakes" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E1A17]">Thick Shakes</h4>
                <p className="text-[10px] text-[#2C2520]/50 mt-0.5">Creamy blended milkshakes</p>
              </div>
            </button>

            {/* Category Item 4 */}
            <button 
              onClick={() => {
                setSelectedCategory('TEA');
                const element = document.getElementById('menu-section');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#2C2520]/5 hover:border-[#D86A4F] transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-md group text-center"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                <img 
                  src={mediaConfig.chaiUrl} 
                  alt="Specialty Teas" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1E1A17]">Specialty Teas</h4>
                <p className="text-[10px] text-[#2C2520]/50 mt-0.5">Saffron Zafrani & Herbs</p>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* ----------------- INTERACTIVE DIGITAL MENU ----------------- */}
      <section id="menu" className="py-16 md:py-24 bg-[#FAF7F2] scroll-mt-20">
        <div id="menu-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Section Heading & Interactive Search bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#2C2520]/10">
            <div className="space-y-1.5">
              <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Browse the Culinary Clock</span>
              <h2 className="font-display text-3xl font-bold text-[#1E1A17]">Our Digital Menu</h2>
              <p className="text-sm text-[#2C2520]/70 max-w-lg">Discover premium meals and beverages. Filter by specific category or type to explore authentic prices.</p>
            </div>

            {/* Interactive Search input */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder="Search menu items..."
                value={menuSearchQuery}
                onChange={(e) => setMenuSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-white border border-[#2C2520]/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:border-transparent placeholder-[#2C2520]/40 transition-all shadow-sm"
              />
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#2C2520]/40" />
            </div>
          </div>

          {/* Interactive Categories scroll-bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-amber-200 -mx-4 px-4 sm:mx-0 sm:px-0">
            {['TEA', 'COFFEE', 'STARTERS', 'PIZZA', 'BURGERS & SIDES', 'GRILLED SANDWICHES', 'NOODLES', 'PASTA & MAGGI', 'RICE', 'MOMOS', 'ROLLS & SPRING ROLLS', 'SHAKES', 'MOCKTAILS'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap shrink-0 transition-all shadow-sm ${
                  selectedCategory === cat 
                    ? 'bg-[#1E1A17] text-white shadow-[#1E1A17]/10' 
                    : 'bg-white text-[#2C2520]/75 hover:bg-[#1E1A17]/5 hover:text-[#1E1A17]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dynamic Grid Layout for Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.length > 0 ? (
              filteredMenuItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white p-5 rounded-2xl border border-[#2C2520]/5 shadow-sm hover:shadow-md hover:border-[#C5A880]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display font-bold text-base text-[#1E1A17] hover:text-[#D86A4F] transition-colors">
                        {item.name}
                      </h3>
                      <span className={`text-[9px] font-bold tracking-wider px-2 py-0.5 rounded shrink-0 ${item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.isVeg ? '● VEG' : '● NON-VEG'}
                      </span>
                    </div>

                    {item.description && (
                      <p className="text-xs text-[#2C2520]/65 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Custom options indicators (e.g. Pizza size info) */}
                    {item.category === 'PIZZA' && (
                      <div className="mt-2 p-2 bg-[#FAF7F2] rounded-lg text-[10px] text-[#2C2520]/60 space-y-0.5">
                        <p>🍕 Standard serving size: <strong className="text-[#1E1A17]">8" (Regular) / 10" (Medium)</strong></p>
                        <p>⭐ Melted double mozzarella base included</p>
                      </div>
                    )}

                    {item.category === 'NOODLES' && (
                      <p className="mt-2 text-[10px] text-amber-800 font-semibold bg-amber-50 py-1 px-2 rounded inline-block">
                        🍜 Available in Half / Full plates
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#2C2520]/5 flex items-center justify-between">
                    <div>
                      {item.category === 'PIZZA' && item.price8 && item.price10 ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#2C2520]/50 uppercase font-bold">Price Range</span>
                          <span className="font-mono font-extrabold text-base text-[#D86A4F]">₹{item.price8} / ₹{item.price10}</span>
                        </div>
                      ) : item.category === 'NOODLES' && item.halfPrice && item.fullPrice ? (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#2C2520]/50 uppercase font-bold">Half / Full</span>
                          <span className="font-mono font-extrabold text-base text-[#D86A4F]">₹{item.halfPrice} / ₹{item.fullPrice}</span>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#2C2520]/50 uppercase font-bold">Net Price</span>
                          <span className="font-mono font-extrabold text-base text-[#D86A4F]">₹{item.price}</span>
                        </div>
                      )}
                    </div>

                    <button 
                      onClick={() => handleQuickReserveItem(item.name)}
                      className="px-4 py-1.5 bg-[#FAF7F2] border border-[#2C2520]/10 hover:bg-[#D86A4F] hover:text-white hover:border-[#D86A4F] rounded-full text-[11px] font-bold tracking-wider uppercase transition-all"
                    >
                      Reserve Spot
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center space-y-3 bg-white rounded-3xl border border-[#2C2520]/5">
                <Utensils className="w-10 h-10 text-[#2C2520]/30 mx-auto" />
                <h4 className="font-bold text-base text-[#1E1A17]">No item matches your filter</h4>
                <p className="text-xs text-[#2C2520]/60 max-w-xs mx-auto">Try typing a different name or browse alternate categories above.</p>
                <button 
                  onClick={() => { setSelectedCategory('TEA'); setMenuSearchQuery(''); }}
                  className="px-4 py-1.5 bg-[#1E1A17] text-white text-xs font-semibold rounded-full hover:bg-[#D86A4F] transition-colors"
                >
                  Reset Catalog Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ----------------- GUEST REVIEWS ----------------- */}
      <section id="reviews" className="py-16 bg-white border-y border-[#2C2520]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase font-sans">Loved by Arrah</span>
            <h2 className="font-display text-3xl font-bold text-[#1E1A17]">Reviews From Our Community</h2>
            <p className="text-sm text-[#2C2520]/70">We are incredibly proud to hold a <strong className="text-[#D86A4F]">4.9 out of 5 stars</strong> rating based on over 70 real customer reviews!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsData.map((review, idx) => (
              <div key={idx} className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#2C2520]/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-[#1E1A17]">{review.name}</h4>
                    <span className="text-[10px] text-[#2C2520]/50">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D86A4F] text-[#D86A4F]" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-[#2C2520]/80 italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Social Proof Stats summary unboxed */}
          <div className="p-8 rounded-3xl border border-[#2C2520]/10 bg-[#FAF7F2] text-center max-w-3xl mx-auto space-y-4">
            <h3 className="font-display font-semibold text-lg text-[#1E1A17]">Share Your Experience!</h3>
            <p className="text-xs text-[#2C2520]/75 max-w-md mx-auto">
              Loved our saffron Zafrani Chai or gourmet paneer pizza? Tell the world! Tag us on Instagram or drop a review.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.instagram.com/the_coffee_clock.in/" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white rounded-full text-xs font-bold shadow-sm hover:shadow border border-[#2C2520]/5 text-[#1E1A17] transition-all"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Instagram: @the_coffee_clock.in</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- TABLE RESERVATION FORM ----------------- */}
      <section id="reservation" className="py-16 md:py-24 bg-[#FAF7F2] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-md border border-[#2C2520]/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Book Your Moment</span>
                <h2 className="font-display text-3xl font-bold text-[#1E1A17] mt-1.5 leading-tight">Reserve a Table</h2>
                <p className="text-sm text-[#2C2520]/70 mt-2">
                  Avoid waiting in lines! Reserve your spot ahead of time for cozy family dinners, friends gatherings, birthday celebrations, or studying sessions.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#D86A4F]/10 flex items-center justify-center text-[#D86A4F] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1E1A17] uppercase">Opening Hours</h4>
                    <p className="text-xs text-[#2C2520]/65 mt-0.5">11:00 AM – 10:30 PM</p>
                    <p className="text-[10px] text-[#2C2520]/50">Every single day of the week</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1E1A17] uppercase">Café Location</h4>
                    <p className="text-xs text-[#2C2520]/65 mt-0.5">Udai Hospital Pul, Station Road, Arrah, Bihar 802301</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1E1A17] uppercase">Contact Hotline</h4>
                    <p className="text-xs text-[#2C2520]/65 mt-0.5">072504 33674</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#2C2520]/15 text-xs text-[#2C2520]/70">
                ⚠️ <strong className="text-[#1E1A17]">No Payments Needed:</strong> Table reservations are 100% free. Clicking submit generates a ready-to-send WhatsApp message to secure your booking instantly with our staff.
              </div>
            </div>

            {/* Right Column Reservation Form */}
            <form onSubmit={handleReservationSubmit} className="lg:col-span-7 space-y-5">
              
              {isReservedSuccessfully && (
                <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-sm flex items-center gap-2.5 animate-fadeIn">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Reservation Prepared!</p>
                    <p className="text-xs text-emerald-700 mt-0.5">Redirecting to send your booking information via WhatsApp...</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="res-name" className="text-xs font-bold text-[#1E1A17] uppercase tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    id="res-name"
                    required
                    placeholder="E.g. Harsh Vardhan"
                    value={reservationName}
                    onChange={(e) => setReservationName(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#2C2520]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:bg-white focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="res-phone" className="text-xs font-bold text-[#1E1A17] uppercase tracking-wider block">Phone Number *</label>
                  <input
                    type="tel"
                    id="res-phone"
                    required
                    placeholder="E.g. +91 7250433674"
                    value={reservationPhone}
                    onChange={(e) => setReservationPhone(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#2C2520]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:bg-white focus:border-transparent transition-all"
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label htmlFor="res-date" className="text-xs font-bold text-[#1E1A17] uppercase tracking-wider block">Date of Visit *</label>
                  <div className="relative">
                    <input
                      type="date"
                      id="res-date"
                      required
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#2C2520]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:bg-white focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Time */}
                <div className="space-y-1">
                  <label htmlFor="res-time" className="text-xs font-bold text-[#1E1A17] uppercase tracking-wider block">Preferred Time *</label>
                  <input
                    type="time"
                    id="res-time"
                    required
                    value={reservationTime}
                    onChange={(e) => setReservationTime(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#2C2520]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:bg-white focus:border-transparent transition-all"
                  />
                </div>

                {/* Guests */}
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="res-guests" className="text-xs font-bold text-[#1E1A17] uppercase tracking-wider block">Number of Guests</label>
                  <select
                    id="res-guests"
                    value={reservationGuests}
                    onChange={(e) => setReservationGuests(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#2C2520]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:bg-white focus:border-transparent transition-all text-[#2C2520]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6+ People (Group/Family)</option>
                  </select>
                </div>

                {/* Message */}
                <div className="space-y-1 sm:col-span-2">
                  <label htmlFor="res-message" className="text-xs font-bold text-[#1E1A17] uppercase tracking-wider block">Special Requests (Optional)</label>
                  <textarea
                    id="res-message"
                    rows={3}
                    placeholder="E.g. Table near the window, celebrating a birthday, preordering a double cheese onion pizza, etc."
                    value={reservationMessage}
                    onChange={(e) => setReservationMessage(e.target.value)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FAF7F2] border border-[#2C2520]/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#D86A4F] focus:bg-white focus:border-transparent transition-all"
                  />
                </div>

              </div>

              <button
                type="submit"
                disabled={isReservedSuccessfully}
                className="w-full py-3.5 bg-[#D86A4F] text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-md hover:bg-[#C0583E] hover:shadow-lg disabled:opacity-50 active:scale-95 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>Reserve a Table Now</span>
              </button>

            </form>

          </div>
        </div>
      </section>

      {/* ----------------- LOCATION & CONTACT MODULE ----------------- */}
      <section id="location" className="py-16 bg-white border-b border-[#2C2520]/5 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Map Display */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#2C2520]/10 h-96 shadow-md bg-slate-100 relative group">
              {/* Real interactive Google Map Embed for the Coffee Clock location */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.065406089851!2d84.6657929!3d25.5694247!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b590029b35b6f%3A0xc331ec30f81a700!2sUdai%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="The Coffee Clock Location Map"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Right Information detail */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Visit The Sanctuary</span>
                <h2 className="font-display text-3xl font-bold text-[#1E1A17] mt-1">Where to Find Us</h2>
                <p className="text-sm text-[#2C2520]/75 mt-2">
                  We are conveniently situated in Arrah, located right near Udai Hospital Pul, on Station Road. Stop by to take a coffee break or treat your family!
                </p>
              </div>

              <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#2C2520]/5 space-y-4">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#1E1A17]/50 uppercase tracking-widest">Address</h4>
                  <p className="text-sm font-bold text-[#1E1A17] leading-relaxed">
                    THE COFFEE CLOCK<br />
                    UDAI HOSPITAL PUL, STATION ROAD,<br />
                    Dharhara, Ahir purawa,<br />
                    Arrah, Bihar 802301
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#2C2520]/50 font-bold uppercase tracking-wider">Call Directly</span>
                    <a href="tel:07250433674" className="text-xs font-extrabold text-[#D86A4F] hover:underline block">072504 33674</a>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#2C2520]/50 font-bold uppercase tracking-wider">Official Web</span>
                    <a href="https://thecoffeeclock.in" target="_blank" rel="noreferrer" className="text-xs font-extrabold text-[#C5A880] hover:underline block">thecoffeeclock.in</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://maps.google.com/?q=Udai+Hospital+Station+Road+Arrah+Bihar" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="px-6 py-3 bg-[#1E1A17] text-white rounded-xl text-xs font-bold tracking-wider uppercase shadow hover:bg-[#342D28] transition-colors inline-flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
                <a 
                  href="tel:07250433674" 
                  className="px-6 py-3 bg-white border border-[#2C2520]/15 text-[#1E1A17] rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#FAF7F2] hover:border-[#1E1A17] transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 072504 33674</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ----------------- REPLACABLE GALLERY INSTAGRAM SECTION ----------------- */}
      <section className="py-16 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          
          <div className="max-w-md mx-auto space-y-1">
            <span className="text-xs font-bold tracking-widest text-[#D86A4F] uppercase">Moments Captured</span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1E1A17]">Inside The Coffee Clock</h2>
            <p className="text-xs text-[#2C2520]/75">Click to follow our journey and tag us in your sweet memories!</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Gallery Post 1 */}
            <a 
              href="https://www.instagram.com/the_coffee_clock.in/" 
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden border border-[#2C2520]/5 shadow-sm bg-[#1E1A17]"
            >
              <img 
                src={mediaConfig.chaiUrl} 
                alt="Aroma Cup" 
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>

            {/* Gallery Post 2 */}
            <a 
              href="https://www.instagram.com/the_coffee_clock.in/" 
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden border border-[#2C2520]/5 shadow-sm bg-[#1E1A17]"
            >
              <img 
                src={mediaConfig.heroImageUrl} 
                alt="Coffee Art" 
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>

            {/* Gallery Post 3 */}
            <a 
              href="https://www.instagram.com/the_coffee_clock.in/" 
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden border border-[#2C2520]/5 shadow-sm bg-[#1E1A17]"
            >
              <img 
                src={mediaConfig.menuPizzaUrl} 
                alt="Cheesy Pizza Slice" 
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>

            {/* Gallery Post 4 */}
            <a 
              href="https://www.instagram.com/the_coffee_clock.in/" 
              target="_blank" 
              rel="noreferrer"
              className="group relative aspect-square rounded-3xl overflow-hidden border border-[#2C2520]/5 shadow-sm bg-[#1E1A17]"
            >
              <img 
                src={mediaConfig.menuShakeUrl} 
                alt="Decadent Milkshake" 
                className="w-full h-full object-cover group-hover:scale-105 group-hover:opacity-40 transition-all duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-8 h-8 text-white" />
              </div>
            </a>

          </div>
        </div>
      </section>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="bg-[#1E1A17] text-[#FAF7F2]/90 pt-16 pb-8 border-t border-white/5 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <a href="#home" className="flex items-center gap-2 group">
                <div className="w-10 h-10 rounded-full bg-[#FAF7F2]/10 flex items-center justify-center text-[#C5A880]">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="font-display text-lg tracking-wider font-bold text-white uppercase">
                  The Coffee Clock
                </span>
              </a>
              <p className="text-xs text-[#FAF7F2]/65 max-w-sm leading-relaxed italic">
                “SIP THE MOMENT • EVERY SECOND COUNTS”
              </p>
              <p className="text-xs text-[#FAF7F2]/65 leading-relaxed">
                We are a premium café & food sanctuary located in Arrah, Bihar. Stop by today for a cup of joy, warm meals, and comforting atmospheres.
              </p>
            </div>

            {/* Quick links Column */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-[#D86A4F] pl-2">Quick Links</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="text-[#FAF7F2]/65 hover:text-white hover:underline transition-all">Home</a></li>
                <li><a href="#menu" className="text-[#FAF7F2]/65 hover:text-white hover:underline transition-all">Menu Catalog</a></li>
                <li><a href="#about" className="text-[#FAF7F2]/65 hover:text-white hover:underline transition-all">Our Story</a></li>
                <li><a href="#experience" className="text-[#FAF7F2]/65 hover:text-white hover:underline transition-all">The Experience</a></li>
                <li><a href="#reviews" className="text-[#FAF7F2]/65 hover:text-white hover:underline transition-all">Reviews</a></li>
                <li><a href="#location" className="text-[#FAF7F2]/65 hover:text-white hover:underline transition-all">Location & Contact</a></li>
              </ul>
            </div>

            {/* Contact details Column */}
            <div className="md:col-span-4 space-y-4 text-left">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest border-l-2 border-[#C5A880] pl-2">Connect Directly</h4>
              <ul className="space-y-2.5 text-xs text-[#FAF7F2]/65">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <span>
                    UDAI HOSPITAL PUL, STATION ROAD,<br />
                    Dharhara, Ahir purawa, Arrah, Bihar 802301
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D86A4F]" />
                  <a href="tel:07250433674" className="hover:text-white transition-all">072504 33674</a>
                </li>
                <li className="flex items-center gap-2">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <a href="https://www.instagram.com/the_coffee_clock.in/" target="_blank" rel="noreferrer" className="hover:text-white transition-all">@the_coffee_clock.in</a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-[#FAF7F2]/45">
            <p>© {new Date().getFullYear()} The Coffee Clock. All Rights Reserved. Crafted with love.</p>
            <p className="mt-2 md:mt-0">Udai Hospital Pul, Station Road, Arrah, Bihar 802301 | <a href="https://thecoffeeclock.in" className="hover:underline">thecoffeeclock.in</a></p>
          </div>
        </div>
      </footer>

    </div>
  );
}
