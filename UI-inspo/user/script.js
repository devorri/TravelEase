/* =========================================
   TravelEase — script.js
   All data, logic, and interactivity
   ========================================= */

// ──────────────────────────────────────────
//  DATA
// ──────────────────────────────────────────

const DESTINATIONS = [
  // ISLANDS
  { id:1, name:"Honda Bay", category:"Island", location:"Puerto Princesa", rating:4.8, desc:"A cluster of pristine islands including Luli, Pandan, Cowrie, and Starfish Island, offering snorkeling, island-hopping, and powdery white sand.", entry:"₱150", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70"] },
  { id:2, name:"Coron Island", category:"Island", location:"Coron, Busuanga", rating:4.9, desc:"A majestic island with towering limestone cliffs, sacred Kayangan Lake, and stunning Barracuda Lake — a UNESCO World Heritage Site candidate.", entry:"₱500", best:"Mar–May", duration:"Full Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=400&q=70","https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=70"] },
  { id:3, name:"Busuanga Island", category:"Island", location:"Coron", rating:4.7, desc:"Gateway to Coron's wonders, with lush forests, untouched beaches, and access to world-famous World War II Japanese shipwrecks.", entry:"Free", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70"] },
  { id:4, name:"Cuyo Island", category:"Island", location:"Cuyo, Palawan", rating:4.5, desc:"A historic island with Spanish-era fortresses, pristine beaches, and charming local culture rarely visited by mass tourism.", entry:"Free", best:"Nov–Apr", duration:"2-3 Days", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=70","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=400&q=70","https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=400&q=70"] },
  { id:5, name:"Calauit Safari Island", category:"Wildlife", location:"Busuanga", rating:4.6, desc:"A unique African wildlife sanctuary with giraffes, zebras, and exotic animals roaming freely alongside Philippine endemic species on a tropical island.", entry:"₱700", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=70","https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=70","https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=70","https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&q=70"] },
  { id:6, name:"Linapacan Island", category:"Beach", location:"Linapacan", rating:4.9, desc:"Home to arguably the clearest ocean water on Earth, with crystal-clear turquoise shallows stretching as far as the eye can see.", entry:"₱100", best:"Dec–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:7, name:"Rasa Island", category:"Wildlife", location:"Narra, Palawan", rating:4.4, desc:"Critical sanctuary for the critically endangered Philippine Cockatoo (Katala), offering birdwatching in pristine mangrove forests.", entry:"₱300", best:"Nov–Apr", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=600&q=70","https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=70","https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&q=70","https://images.unsplash.com/photo-1462953491269-9aff00919695?w=400&q=70"] },
  { id:8, name:"Ursula Island", category:"Island", location:"Puerto Princesa Bay", rating:4.3, desc:"A bird sanctuary and nesting ground for thousands of migrating birds, perfect for eco-tours and nature photography.", entry:"₱200", best:"Oct–Feb", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=600&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=400&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=70","https://images.unsplash.com/photo-1500049242364-5f500807cdd7?w=400&q=70"] },

  // BEACHES
  { id:9, name:"Nacpan Beach", category:"Beach", location:"El Nido", rating:4.9, desc:"A 4-kilometer stretch of golden sand often voted as one of Southeast Asia's best beaches, backed by swaying palms and crystal-clear waters.", entry:"₱50", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70"] },
  { id:10, name:"Long Beach San Vicente", category:"Beach", location:"San Vicente", rating:4.8, desc:"The longest white-sand beach in the Philippines at 14 kilometers, largely undeveloped and wonderfully serene.", entry:"₱30", best:"Oct–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=400&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:11, name:"Sabang Beach", category:"Beach", location:"Sabang, Puerto Princesa", rating:4.5, desc:"Black-sand beach near the Underground River, framed by jungle and great for watching fireflies at night.", entry:"Free", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70"] },
  { id:12, name:"Club Paradise Beach", category:"Beach", location:"Coron", rating:4.7, desc:"Private resort island with stunning coral reefs, azure waters, and lush tropical greenery — a true paradise retreat.", entry:"₱500", best:"Mar–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70"] },
  { id:13, name:"Duli Beach", category:"Beach", location:"El Nido", rating:4.7, desc:"Secluded surf beach backed by steep jungle mountains, offering uncrowded breaks for beginners and experienced surfers alike.", entry:"Free", best:"Jun–Oct", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70"] },
  { id:14, name:"Paly Beach", category:"Beach", location:"Coron", rating:4.5, desc:"A quiet, scenic beach popular with locals and savvy travelers seeking solitude among dramatic karst limestone backdrops.", entry:"₱50", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=400&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70"] },
  { id:15, name:"Marimegmeg Beach", category:"Beach", location:"El Nido", rating:4.6, desc:"Also known as Las Cabanas Beach, this sunset-viewing haven is famous for its zipline over the sea and dramatic twilight views.", entry:"Free", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=600&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=400&q=70","https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=400&q=70"] },

  // LAGOONS
  { id:16, name:"Big Lagoon", category:"Lagoon", location:"El Nido", rating:4.9, desc:"One of El Nido's most iconic lagoons, surrounded by vertical limestone karsts and offering kayaking through dramatic seascape.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=400&q=70"] },
  { id:17, name:"Small Lagoon", category:"Lagoon", location:"El Nido", rating:4.8, desc:"An enclosed turquoise lagoon accessible through a narrow rock crevice, offering surreal swimming and snorkeling inside.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"2-3 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70"] },
  { id:18, name:"Secret Lagoon", category:"Lagoon", location:"El Nido", rating:4.7, desc:"Hidden behind a rock wall, this magical lagoon can only be reached by swimming through a small opening — a true adventure.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"2-3 Hours", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=70"] },
  { id:19, name:"Kayangan Lake", category:"Lagoon", location:"Coron Island", rating:4.9, desc:"The cleanest lake in Asia, nestled between towering limestone peaks, with crystal-clear water revealing stunning underwater rock formations.", entry:"₱500 (incl. Coron Island permit)", best:"Mar–May", duration:"Full Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=70"] },
  { id:20, name:"Barracuda Lake", category:"Lagoon", location:"Coron Island", rating:4.8, desc:"A thermocline diving wonder — warm fresh water above, cold salt water below — home to a massive barracuda and unique rock formations.", entry:"₱500 (incl. Coron Island permit)", best:"Mar–May", duration:"Half Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=400&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70"] },

  // CAVES
  { id:21, name:"Puerto Princesa Underground River", category:"Cave", location:"Sabang, Puerto Princesa", rating:4.9, desc:"UNESCO World Heritage Site and New 7 Wonders of Nature — an 8.2 km navigable underground river system inside a stunning cave.", entry:"₱150 + ₱40 paddle boat", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=600&q=70","https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=70"] },
  { id:22, name:"Ugong Rock Cave", category:"Cave", location:"Puerto Princesa", rating:4.6, desc:"A hollow mountain with resonant rock chambers and a thrilling zipline adventure from the summit back down.", entry:"₱400", best:"Nov–May", duration:"Half Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=400&q=70","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70"] },
  { id:23, name:"Tabon Caves", category:"Cave", location:"Quezon, Palawan", rating:4.4, desc:"Renowned archaeological site where ancient human remains (Tabon Man) were discovered — a complex of 200+ caves along coastal cliffs.", entry:"₱100", best:"Nov–May", duration:"Half Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=70","https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=400&q=70"] },

  // DIVING
  { id:24, name:"Tubbataha Reef", category:"Diving", location:"Cagayancillo", rating:5.0, desc:"UNESCO World Heritage Site and one of the world's top 10 dive sites — a pristine atoll teeming with sharks, rays, and enormous marine biodiversity.", entry:"Liveaboard only (₱15,000+)", best:"Mar–Jun", duration:"Multi-day", difficulty:"Expert",
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70"] },
  { id:25, name:"WWII Japanese Wrecks Coron", category:"Diving", location:"Coron", rating:4.9, desc:"12 Japanese warships sunk in 1944 now form one of Asia's best wreck-diving destinations, covered in coral and teeming with marine life.", entry:"₱200 + dive fee", best:"Mar–May", duration:"Full Day", difficulty:"Intermediate",
    images:["https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70"] },
  { id:26, name:"Dimakya Island Diving", category:"Diving", location:"Coron", rating:4.7, desc:"Excellent dive site with vibrant soft corals, sea turtles, and diverse reef fish — perfect for underwater photography.", entry:"₱300 + dive fee", best:"Nov–May", duration:"Full Day", difficulty:"Beginner",
    images:["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=70"] },
  { id:27, name:"Apo Reef Natural Park", category:"Diving", location:"Mindoro-Palawan border", rating:4.8, desc:"The world's second-largest contiguous coral reef system, with hammerhead sharks, sea turtles, and magnificent reef walls.", entry:"₱400 + dive fee", best:"Mar–Jun", duration:"Multi-day", difficulty:"Advanced",
    images:["https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70"] },
  { id:28, name:"El Nido Dive Sites", category:"Diving", location:"El Nido", rating:4.8, desc:"Over 50 dive sites surrounding El Nido's archipelago, featuring swim-throughs, caves, coral gardens, and rich pelagic encounters.", entry:"₱200 (EcoFee) + dive fee", best:"Nov–May", duration:"Full Day", difficulty:"Intermediate",
    images:["https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70"] },

  // ADVENTURE
  { id:29, name:"Mount Bloomfield Trek", category:"Adventure", location:"Sabang, Puerto Princesa", rating:4.5, desc:"A challenging jungle hike offering panoramic views of Palawan's coastline and dense rainforest canopy — home to monitor lizards and exotic birds.", entry:"₱100", best:"Nov–Apr", duration:"Half Day", difficulty:"Challenging",
    images:["https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70"] },
  { id:30, name:"Maoyon River Kayaking", category:"Adventure", location:"Narra, Palawan", rating:4.6, desc:"Multi-day kayaking expedition through mangroves, limestone cliffs, and isolated beaches along one of Palawan's most scenic rivers.", entry:"₱1,500 (guided tour)", best:"Nov–May", duration:"Multi-day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70","https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=400&q=70"] },
  { id:31, name:"Cleopatra's Needle Climb", category:"Adventure", location:"Puerto Princesa", rating:4.4, desc:"The highest peak in Palawan (1,593m), surrounded by virgin rainforest, offering epic biodiversity and challenging multi-day trek.", entry:"₱500 (guide required)", best:"Mar–May", duration:"3 Days", difficulty:"Expert",
    images:["https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70"] },
  { id:32, name:"Twin Peaks El Nido Trek", category:"Adventure", location:"El Nido", rating:4.7, desc:"Iconic sunrise hike to the twin peaks overlooking El Nido town and its magnificent archipelago — best done at dawn.", entry:"₱300", best:"Nov–May", duration:"3-4 Hours", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70"] },
  { id:33, name:"Firefly Watching Iwahig", category:"Adventure", location:"Puerto Princesa", rating:4.7, desc:"Magical evening boat ride along the Iwahig River where thousands of fireflies illuminate the mangrove trees like living Christmas lights.", entry:"₱550 (guided tour)", best:"Year-round", duration:"3 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=600&q=70","https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=400&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70"] },

  // CULTURAL
  { id:34, name:"Iwahig Prison & Penal Farm", category:"Cultural", location:"Puerto Princesa", rating:4.3, desc:"Unique 'open prison' where inmates farm and live freely in a scenic environment — a thought-provoking cultural tourism experience.", entry:"₱50", best:"Year-round", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=600&q=70","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=400&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70"] },
  { id:35, name:"Palawan Heritage Center", category:"Cultural", location:"Puerto Princesa", rating:4.4, desc:"Museum showcasing Palawan's rich cultural heritage, indigenous tribes, natural history, and archaeological discoveries.", entry:"₱50", best:"Year-round", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=600&q=70","https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=400&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=70","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=70"] },
  { id:36, name:"Tagbanua Village Visit", category:"Cultural", location:"Coron Island", rating:4.6, desc:"Visit one of the Philippines' oldest indigenous communities, still living their traditional lifestyle on Coron Island.", entry:"₱500 (incl. island fee)", best:"Nov–May", duration:"3-4 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=70","https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=400&q=70","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=400&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&q=70"] },
  { id:37, name:"Puerto Princesa Night Market", category:"Cultural", location:"Puerto Princesa", rating:4.5, desc:"Lively night market along the bayfront featuring local delicacies, fresh seafood, handcrafted goods, and cultural performances.", entry:"Free", best:"Year-round", duration:"3 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=600&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=70","https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=400&q=70","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=400&q=70"] },

  // More destinations to reach 100+
  { id:38, name:"Pasandigan Cove", category:"Beach", location:"El Nido", rating:4.6, desc:"Hidden cove accessible only by boat, with shallow emerald waters and pristine coral gardens ideal for snorkeling.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70"] },
  { id:39, name:"Helicopter Island", category:"Island", location:"El Nido", rating:4.8, desc:"Shaped like a helicopter from above, this gem features perfect pink-hued sand, rich snorkeling, and dramatic rock face backdrops.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70"] },
  { id:40, name:"Shimizu Island", category:"Diving", location:"El Nido", rating:4.7, desc:"El Nido's premier snorkeling and diving spot, teeming with colorful reef fish, sea turtles, and lush coral formations.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70"] },
  { id:41, name:"Cadlao Island", category:"Island", location:"El Nido", rating:4.7, desc:"The largest island in El Nido, with secluded beaches, a freshwater lagoon, and trails through pristine forest.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70"] },
  { id:42, name:"Matinloc Island Shrine", category:"Cultural", location:"El Nido", rating:4.7, desc:"Abandoned Shrine with a stunning viewpoint, dramatic sea caves, and hidden beach on the eastern side of the island.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70","https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=400&q=70","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=400&q=70"] },
  { id:43, name:"Pinagbuyutan Island", category:"Island", location:"El Nido", rating:4.8, desc:"Arguably El Nido's most photogenic spot — a single coconut tree on a sand bar with impossibly blue water surrounding it.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:44, name:"Dilumacad Island", category:"Island", location:"El Nido", rating:4.6, desc:"'Helmet Island' with pristine beaches and excellent snorkeling along dramatic limestone walls.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:45, name:"Seven Commandos Beach", category:"Beach", location:"El Nido", rating:4.7, desc:"Named after WW2 guerrillas who sheltered here, this pristine beach has hammocks, huts, and some of El Nido's clearest waters.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70"] },
  { id:46, name:"Port Barton Beach", category:"Beach", location:"San Vicente", rating:4.6, desc:"Laid-back beach town with clear waters, island-hopping, and a relaxed hippie vibe — perfect for budget travelers seeking authenticity.", entry:"Free", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70"] },
  { id:47, name:"Crocodile Island El Nido", category:"Island", location:"El Nido", rating:4.5, desc:"Not actual crocodiles — the island resembles a crocodile from the water. A fantastic snorkeling spot with sea turtles.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=70"] },
  { id:48, name:"Bulalacao Falls", category:"Adventure", location:"El Nido", rating:4.5, desc:"Hidden freshwater waterfall deep in the jungle, accessible by trekking — a refreshing off-the-beaten-path adventure.", entry:"₱100", best:"Jun–Nov", duration:"Half Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:49, name:"Starfish Island Honda Bay", category:"Island", location:"Puerto Princesa", rating:4.5, desc:"Shallow sandbar covered in colorful starfish and corals — perfect for non-swimmers to experience marine life up close.", entry:"₱150 (Honda Bay tour)", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70"] },
  { id:50, name:"Luli Island Honda Bay", category:"Island", location:"Puerto Princesa", rating:4.5, desc:"'LUlabog at LUmubog' island — partially submerges during high tide, offering a unique sandbar walking experience.", entry:"₱150 (Honda Bay tour)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70"] },
  { id:51, name:"Pandan Island", category:"Island", location:"Puerto Princesa", rating:4.6, desc:"Exclusive beach resort island with pristine reefs, white sand, and lush vegetation — a popular day trip from Puerto Princesa.", entry:"₱150 (Honda Bay tour)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:52, name:"Cowrie Island", category:"Island", location:"Puerto Princesa", rating:4.7, desc:"Beautiful white sandy island with excellent snorkeling, beach volleyball, and stunning sunset views across Honda Bay.", entry:"₱150 (Honda Bay tour)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70"] },
  { id:53, name:"Maquinit Hot Spring", category:"Adventure", location:"Coron", rating:4.7, desc:"The Philippines' only saltwater hot spring — naturally heated seawater pools surrounded by mangrove trees and jungle.", entry:"₱200", best:"Year-round", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70"] },
  { id:54, name:"CYC Beach Coron", category:"Beach", location:"Coron", rating:4.8, desc:"Crystal-clear water beach near Coron Town, with stunning views of Coron Island and pristine snorkeling just offshore.", entry:"₱50", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=70"] },
  { id:55, name:"Twin Lagoon Coron", category:"Lagoon", location:"Coron", rating:4.9, desc:"Two stunning lagoons connected by a narrow passage — one emerald freshwater, one turquoise saltwater — surrounded by sheer cliffs.", entry:"₱200", best:"Nov–May", duration:"Half Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=400&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70"] },
  { id:56, name:"Skeleton Wreck Coron", category:"Diving", location:"Coron", rating:4.8, desc:"One of the most intact WWII wrecks in Coron, completely covered in corals and swarming with tropical fish — thrilling for advanced divers.", entry:"₱200 + dive fee", best:"Mar–May", duration:"Full Day", difficulty:"Advanced",
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70"] },
  { id:57, name:"Siganap Hot Spring", category:"Adventure", location:"Puerto Princesa", rating:4.3, desc:"Natural hot spring nestled in the jungle, perfect for a relaxing soak after a day of exploring Palawan's wilderness.", entry:"₱100", best:"Year-round", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=400&q=70","https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=400&q=70"] },
  { id:58, name:"Banol Beach Coron", category:"Beach", location:"Coron", rating:4.6, desc:"Gorgeous small beach just outside Coron town with swimmable waters, coral snorkeling, and dramatic limestone backdrop.", entry:"₱50", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=70"] },
  { id:59, name:"Balabac Islands", category:"Island", location:"Balabac, Palawan", rating:4.9, desc:"Isolated paradise at the southernmost tip of Palawan — home to Candaraman, Onok, and Bugsuk islands with near-untouched marine life.", entry:"Travel permit req.", best:"Mar–May", duration:"Multi-day", difficulty:"Challenging",
    images:["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:60, name:"Onok Island Balabac", category:"Beach", location:"Balabac", rating:4.9, desc:"Pristine sandbar island with shallow turquoise waters rarely visited by tourists — one of the Philippines' last unspoiled paradises.", entry:"Travel permit req.", best:"Mar–May", duration:"Multi-day", difficulty:"Expert",
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70"] },
  { id:61, name:"Malampaya Sound", category:"Wildlife", location:"Taytay, Palawan", rating:4.7, desc:"Rare protected seascape where dugongs, sea turtles, and diverse marine life thrive in a pristine coastal estuary.", entry:"₱200 (boat tour)", best:"Nov–Apr", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=70","https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&q=70","https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=70"] },
  { id:62, name:"Nagtabon Beach", category:"Beach", location:"Puerto Princesa", rating:4.7, desc:"Undiscovered gem with grey-green water, dramatic surf, and uncrowded shoreline backed by forested hills — a favorite among locals.", entry:"₱50", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:63, name:"Ulugan Bay", category:"Adventure", location:"Puerto Princesa", rating:4.4, desc:"Pristine bay with mangrove forests, migratory birds, and traditional fishing communities — excellent for kayaking and nature tours.", entry:"₱200 (guided)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=400&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=400&q=70"] },
  { id:64, name:"Flower Island Beach Resort", category:"Beach", location:"Taytay", rating:4.7, desc:"An exclusive island paradise in northern Palawan, with romantic cottages, snorkeling, and dive access to pristine reefs.", entry:"Resort guests only", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70"] },
  { id:65, name:"Taytay Fort", category:"Cultural", location:"Taytay, Palawan", rating:4.3, desc:"17th-century Spanish colonial fort overlooking Taytay Bay — one of Palawan's most significant historical landmarks.", entry:"₱30", best:"Year-round", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=600&q=70","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=400&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=70","https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=400&q=70"] },
  { id:66, name:"Calauit Giant Clam Sanctuary", category:"Wildlife", location:"Coron", rating:4.5, desc:"Shallow marine sanctuary with giant clams (over 500kg!) and colorful corals — great for snorkeling and marine education.", entry:"₱200", best:"Nov–May", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&q=70","https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70","https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=70"] },
  { id:67, name:"El Nido Viewdeck", category:"Adventure", location:"El Nido Town", rating:4.6, desc:"Iconic rocky summit above El Nido town offering the most breathtaking panorama of the archipelago at sunrise and sunset.", entry:"Free", best:"Year-round", duration:"1-2 Hours", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70"] },
  { id:68, name:"Miniloc Island", category:"Island", location:"El Nido", rating:4.8, desc:"Home to the famous Small and Big Lagoons, this island is El Nido's crown jewel offering magnificent limestone scenery.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70"] },
  { id:69, name:"Pangulasian Island", category:"Island", location:"El Nido", rating:4.8, desc:"Private island resort dubbed the 'Island of the Sun' for its exceptional east-facing sunrise and west-facing sunset views.", entry:"Resort guests only", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70"] },
  { id:70, name:"Lagen Island", category:"Island", location:"El Nido", rating:4.9, desc:"Eco-resort island where the resort blends seamlessly into the old-growth forest, with overwater cottages and world-class marine biodiversity.", entry:"Resort guests only", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70"] },
  { id:71, name:"Cudugnon Cave", category:"Cave", location:"El Nido", rating:4.5, desc:"Ancient cave used by Palawan's earliest inhabitants, with prehistoric artifacts and beautiful surrounding waters for swimming.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=400&q=70","https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70"] },
  { id:72, name:"Snake Island El Nido", category:"Island", location:"El Nido", rating:4.8, desc:"An S-shaped sandbar that snakes through the bay, fully exposed at low tide for a magical walking experience.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:73, name:"Pangalusian Island Beach", category:"Beach", location:"El Nido", rating:4.7, desc:"Stunning crescent beach on the south side of the island, with calm waters, soft sand, and beautiful coral gardens.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=70"] },
  { id:74, name:"Palawan Wildlife Rescue Center", category:"Wildlife", location:"Puerto Princesa", rating:4.5, desc:"Conservation center for Philippine crocodiles, bearcat, pangolins, and other endangered wildlife — educational and family-friendly.", entry:"₱50", best:"Year-round", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&q=70","https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=70","https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=400&q=70","https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=400&q=70"] },
  { id:75, name:"Bay-ang Lagoon", category:"Lagoon", location:"Coron", rating:4.6, desc:"Emerald-green lagoon surrounded by steep forested cliffs near Coron, with excellent swimming in warm, clear water.", entry:"₱200", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=70","https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=70"] },
  { id:76, name:"Sangat Island Cove", category:"Island", location:"Coron", rating:4.7, desc:"Private island resort surrounded by WWII Japanese wrecks, with a stunning cove and house reef for world-class snorkeling and diving.", entry:"Resort guests preferred", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70"] },
  { id:77, name:"Reefs of Black Island Coron", category:"Diving", location:"Coron", rating:4.7, desc:"Black limestone island with striking dark rock and contrasting turquoise sea — snorkeling and diving across diverse marine habitats.", entry:"₱200", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70"] },
  { id:78, name:"Sibaltan Beach", category:"Beach", location:"El Nido", rating:4.6, desc:"Remote village beach on El Nido's eastern coast, offering crystal-clear waters, excellent kitesurfing, and off-grid charm.", entry:"Free", best:"Nov–May", duration:"Multi-day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:79, name:"Tapyas Hill El Nido", category:"Adventure", location:"El Nido", rating:4.5, desc:"Rocky hill above El Nido town with 300+ steps and a large cross at the top, offering a 360-degree panorama of the bay.", entry:"Free", best:"Year-round", duration:"1 Hour", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70"] },
  { id:80, name:"Decabuyan Island", category:"Island", location:"Balabac", rating:4.8, desc:"Remote island in Balabac with some of the Philippines' most pristine coral reefs and brilliant turquoise shallows.", entry:"Travel permit req.", best:"Mar–May", duration:"Multi-day", difficulty:"Expert",
    images:["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:81, name:"Bulog Dos Island", category:"Island", location:"Coron", rating:4.7, desc:"Beautiful island with a stunning sandbar, clear blue water, and easy snorkeling — one of Coron's best day-trip destinations.", entry:"₱200", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70"] },
  { id:82, name:"Coron Town Viewdeck", category:"Cultural", location:"Coron", rating:4.4, desc:"Mount Tapyas viewdeck above Coron town, with 700+ steps and spectacular views over the islands and sea at sunset.", entry:"Free", best:"Year-round", duration:"2 Hours", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=70"] },
  { id:83, name:"Mangrove Paddle Tour", category:"Adventure", location:"El Nido", rating:4.6, desc:"Kayak through ancient mangrove forests teeming with kingfishers, sea eagles, and Philippine crocodiles on a guided eco-tour.", entry:"₱800 (guided tour)", best:"Year-round", duration:"3 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=400&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=400&q=70"] },
  { id:84, name:"Sabang Beach Mangroves", category:"Wildlife", location:"Sabang", rating:4.4, desc:"Explore pristine mangrove ecosystems by kayak or bangka boat near the Underground River, with diverse birdlife and wildlife.", entry:"₱200 (guided)", best:"Nov–May", duration:"2 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=600&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=400&q=70","https://images.unsplash.com/photo-1462953491269-9aff00919695?w=400&q=70"] },
  { id:85, name:"Lusong Gunboat Wreck", category:"Diving", location:"Coron", rating:4.8, desc:"Shallow WWII gunboat wreck perfect for snorkelers and beginner divers, encrusted with corals and colorful reef fish.", entry:"₱200 + dive fee", best:"Mar–May", duration:"Half Day", difficulty:"Beginner",
    images:["https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70"] },
  { id:86, name:"Bacuit Bay Sunset Cruise", category:"Adventure", location:"El Nido", rating:4.9, desc:"Romantic sunset sailing through El Nido's iconic Bacuit Archipelago — champagne, views, and unforgettable golden-hour skies.", entry:"₱1,200 (cruise)", best:"Nov–May", duration:"3 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=600&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=70","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70"] },
  { id:87, name:"Binaluan Cove", category:"Beach", location:"Coron", rating:4.6, desc:"Stunning hidden cove with calm waters, white sand, and mangrove edges — peaceful and perfect for swimming and relaxation.", entry:"₱100", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:88, name:"Malcapuya Island", category:"Island", location:"Coron", rating:4.8, desc:"Remote pristine island with the finest white sand in Coron, crystal clear water, and vibrant snorkeling reefs.", entry:"₱200", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400&q=70"] },
  { id:89, name:"Banana Island Coron", category:"Island", location:"Coron", rating:4.7, desc:"Lovely island shaped like a banana with pristine beach and wonderful snorkeling — perfect for a half-day trip.", entry:"₱200", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70"] },
  { id:90, name:"Matinloc Hidden Beach", category:"Beach", location:"El Nido", rating:4.9, desc:"Only accessible at low tide through a narrow rock crevice, this concealed white-sand beach is El Nido's most exclusive secret.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70"] },
  { id:91, name:"Coron Diving Safari", category:"Diving", location:"Coron", rating:4.9, desc:"Full multi-day dive safari hitting all 12 WWII wrecks plus pristine reefs — the ultimate Coron dive experience.", entry:"₱8,000+ (package)", best:"Mar–May", duration:"Multi-day", difficulty:"Advanced",
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=400&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70"] },
  { id:92, name:"Tukuran Island", category:"Island", location:"Coron", rating:4.6, desc:"Small, secluded island with powdery white beach and incredibly clear waters — rarely crowded and deeply peaceful.", entry:"₱200", best:"Nov–May", duration:"Half Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:93, name:"Port Barton Snorkeling", category:"Diving", location:"San Vicente", rating:4.7, desc:"Pristine coral gardens and diverse reef fish surrounding the Port Barton island cluster — excellent snorkeling for all levels.", entry:"₱300 (boat tour)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=400&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=400&q=70"] },
  { id:94, name:"Buhatan River Cruise", category:"Adventure", location:"Puerto Princesa", rating:4.5, desc:"Jungle river cruise along the Buhatan River offering encounters with monitor lizards, macaques, and lush rainforest wildlife.", entry:"₱400 (guided tour)", best:"Nov–May", duration:"3 Hours", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=400&q=70","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=400&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=400&q=70"] },
  { id:95, name:"Palawan Butterfly Garden", category:"Wildlife", location:"Puerto Princesa", rating:4.2, desc:"Lush butterfly sanctuary and insect zoo featuring dozens of endemic Palawan butterfly species and fascinating insects.", entry:"₱80", best:"Year-round", duration:"1 Hour", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=70","https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400&q=70","https://images.unsplash.com/photo-1462953491269-9aff00919695?w=400&q=70","https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=400&q=70"] },
  { id:96, name:"Tres Marias Rocks", category:"Adventure", location:"El Nido", rating:4.7, desc:"Three iconic rock formations rising from the sea — fantastic viewpoint destination on island-hopping Tour C.", entry:"₱200 (EcoFee)", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=400&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=400&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=400&q=70"] },
  { id:97, name:"Agutaya Island", category:"Island", location:"Cuyo Islands", rating:4.4, desc:"Rarely visited island with Spanish-era ruins, pristine beaches, and a deeply authentic local fishing community to explore.", entry:"Travel permit req.", best:"Nov–Apr", duration:"Multi-day", difficulty:"Challenging",
    images:["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=400&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=400&q=70"] },
  { id:98, name:"Dumaran Island", category:"Island", location:"Dumaran, Palawan", rating:4.5, desc:"Large island with gorgeous beaches, fishing villages, and hidden lagoons rarely explored by mainstream tourism.", entry:"Free", best:"Nov–May", duration:"Multi-day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70"] },
  { id:99, name:"Roxas Beaches", category:"Beach", location:"Roxas, Palawan", rating:4.4, desc:"Untouched white sand beaches along the shores of Roxas, offering solitude and pristine snorkeling away from the tourist trail.", entry:"Free", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] },
  { id:100, name:"Candaraman Island", category:"Island", location:"Balabac, Palawan", rating:5.0, desc:"Considered one of the most beautiful islands on Earth — towering over brilliant turquoise shallows, powder-white sandbars, and untouched coral ecosystems.", entry:"Travel permit req.", best:"Mar–May", duration:"Multi-day", difficulty:"Expert",
    images:["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=70"] },
  { id:101, name:"Coron Lagoon", category:"Lagoon", location:"Coron Island", rating:4.8, desc:"Stunning emerald lagoon inside Coron Island, enclosed by towering karst limestone cliffs and accessible only by boat.", entry:"₱500 (incl. Coron Island permit)", best:"Mar–May", duration:"Full Day", difficulty:"Moderate",
    images:["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=400&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=70"] },
  { id:102, name:"Aborlan Beach", category:"Beach", location:"Aborlan, Palawan", rating:4.3, desc:"Peaceful beach town with uncrowded shoreline, seafood restaurants, and easy access to offshore snorkeling spots.", entry:"Free", best:"Nov–May", duration:"Full Day", difficulty:"Easy",
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=400&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=400&q=70"] }
];

const HOTELS = [
  { id:1, name:"El Nido Resorts – Lagen Island", location:"Lagen Island, El Nido", area:"El Nido", stars:5, price:22000,
    images:["https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70"],
    amenities:["Overwater Cottages","Dive Center","Spa","Fine Dining","Eco-Tours","WiFi"],
    rooms:[{type:"Forest Water Cottage",desc:"Overwater cottage, forest canopy views, king bed",rate:22000,capacity:2,avail:2},{type:"Water Cottage",desc:"Overwater, panoramic sea view, private deck",rate:26000,capacity:2,avail:1},{type:"Beach Cottage",desc:"Beachfront, king or twin beds",rate:20000,capacity:3,avail:3},{type:"Hillside Suite",desc:"Panoramic views, private terrace, living area",rate:32000,capacity:4,avail:1}] },
  { id:2, name:"Miniloc Island Resort", location:"Miniloc Island, El Nido", area:"El Nido", stars:5, price:18000,
    images:["https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=800&q=75","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70"],
    amenities:["Water Cottages","Beach Bar","Kayaking","Snorkeling","Restaurant","Transfer Boat"],
    rooms:[{type:"Beachside Cottage",desc:"Steps from the beach, twin or king",rate:18000,capacity:2,avail:3},{type:"Sea View Cottage",desc:"Elevated panoramic sea views",rate:21000,capacity:2,avail:2},{type:"Water Cottage",desc:"Built over the sea on stilts",rate:28000,capacity:3,avail:1},{type:"Family Cottage",desc:"Two rooms, shared veranda, sleeps 5",rate:34000,capacity:5,avail:1}] },
  { id:3, name:"Pangulasian Island Resort", location:"Pangulasian Island, El Nido", area:"El Nido", stars:5, price:19500,
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["Private Beach","Sunset Views","Pool","Spa","Fine Dining","Island Tours"],
    rooms:[{type:"Deluxe Villa",desc:"Garden-facing villa with terrace, 45sqm",rate:19500,capacity:3,avail:4},{type:"Premium Sea View",desc:"Direct ocean views, private plunge pool",rate:26000,capacity:3,avail:2},{type:"Sunset Suite",desc:"Panoramic west-facing suite, full sunset views",rate:34000,capacity:4,avail:1},{type:"Panorama Villa",desc:"Largest villa, 360 views, butler service",rate:48000,capacity:6,avail:1}] },
  { id:4, name:"El Nido Cove Resort", location:"El Nido Town", area:"El Nido", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70"],
    amenities:["Beach Access","Restaurant","WiFi","Tour Desk","Kayak Rental"],
    rooms:[{type:"Standard Fan Room",desc:"Fan-cooled, garden view, queen bed",rate:1500,capacity:2,avail:6},{type:"Deluxe AC Room",desc:"Air-conditioned, partial sea view",rate:2800,capacity:3,avail:4},{type:"Sea View Room",desc:"Full sea view, air-conditioned, balcony",rate:3800,capacity:3,avail:2},{type:"Family Room",desc:"Bunk beds for kids plus queen, AC",rate:4200,capacity:5,avail:2}] },
  { id:5, name:"Cadlao Resort & Restaurant", location:"Corong-Corong, El Nido", area:"El Nido", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70"],
    amenities:["Bay Views","Restaurant","Bar","WiFi","Tour Desk","Beach Access"],
    rooms:[{type:"Standard Room",desc:"Cozy room, garden or bay view",rate:2200,capacity:2,avail:5},{type:"Deluxe Room",desc:"Sea view balcony, queen bed",rate:3200,capacity:3,avail:4},{type:"Junior Suite",desc:"Separate living area, panoramic views",rate:5500,capacity:4,avail:2},{type:"Family Suite",desc:"Two rooms, full sea view, kitchenette",rate:7200,capacity:6,avail:1}] },
  { id:6, name:"Nacpan Beach Glamping Resort", location:"Nacpan Beach, El Nido", area:"El Nido", stars:3, price:4500,
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70"],
    amenities:["Beachfront","Glamping Tents","Sunset Views","Breakfast Incl.","Kayak","Hammocks"],
    rooms:[{type:"Beach Tent Deluxe",desc:"Safari-style glamping tent on the beach",rate:3500,capacity:2,avail:4},{type:"Premium Beach Tent",desc:"Larger tent, private deck, sunset-facing",rate:4500,capacity:3,avail:3},{type:"Family Beach Tent",desc:"Extra-large tent with 2 sleeping areas",rate:6500,capacity:5,avail:2},{type:"Beachfront Cottage",desc:"Solid cottage, sea view, AC, private porch",rate:8000,capacity:4,avail:1}] },
  { id:7, name:"Duli Beach Resort", location:"Duli Beach, El Nido", area:"El Nido", stars:3, price:3800,
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70"],
    amenities:["Surf Beach","Restaurant","Bar","Yoga","Kayak","WiFi"],
    rooms:[{type:"Bamboo Cottage",desc:"Eco bamboo cottage, garden view",rate:2500,capacity:2,avail:5},{type:"Deluxe Beachfront",desc:"Steps from the surf, private porch",rate:3800,capacity:3,avail:3},{type:"Surfer Suite",desc:"Larger room, board storage, lounge area",rate:5200,capacity:4,avail:2},{type:"Beach House",desc:"Entire house, 3 rooms, full kitchen",rate:12000,capacity:6,avail:1}] },
  { id:8, name:"Maremegmeg Beach Club & Lodge", location:"Las Cabanas, El Nido", area:"El Nido", stars:3, price:3000,
    images:["https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=600&q=70","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=600&q=70"],
    amenities:["Sunset Beach","Zipline Access","Bar","Restaurant","WiFi","Hammocks"],
    rooms:[{type:"Standard Room",desc:"Garden view, fan-cooled, twin beds",rate:2000,capacity:2,avail:6},{type:"Deluxe Room",desc:"AC, sea view, queen bed",rate:3000,capacity:3,avail:4},{type:"Sunset Suite",desc:"Premium west-facing suite, sunset views",rate:4800,capacity:4,avail:2},{type:"Family Cottage",desc:"2 bedrooms, kitchenette, porch",rate:7000,capacity:6,avail:1}] },
  { id:9, name:"Port Barton Garden Resort", location:"Port Barton, San Vicente", area:"Port Barton", stars:3, price:1800,
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["Beach","Island Hopping","Restaurant","Bar","WiFi","Hammocks"],
    rooms:[{type:"Bamboo Hut",desc:"Traditional bamboo hut, fan, garden",rate:900,capacity:2,avail:8},{type:"Standard Room",desc:"Concrete room, fan, garden view",rate:1400,capacity:2,avail:5},{type:"Deluxe Room",desc:"AC, sea view, queen bed",rate:1800,capacity:3,avail:3},{type:"Family Bungalow",desc:"2-room bungalow, AC, sea view",rate:3500,capacity:6,avail:2}] },
  { id:10, name:"El Nido Bayview Hotel", location:"El Nido Town", area:"El Nido", stars:3, price:2400,
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70"],
    amenities:["Bay Views","Restaurant","Bar","Tour Desk","WiFi","Rooftop Terrace"],
    rooms:[{type:"Standard Room",desc:"City view, queen bed, AC",rate:1800,capacity:2,avail:8},{type:"Deluxe Bay View",desc:"Direct bay view, king bed",rate:2400,capacity:3,avail:5},{type:"Junior Suite",desc:"Living area, panoramic bay view",rate:3800,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, great views, AC",rate:5200,capacity:5,avail:1}] },
  { id:11, name:"Discovery Coron Bay Resort & Spa", location:"Coron, Busuanga", area:"Coron", stars:5, price:9800,
    images:["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["Infinity Pool","Dive Center","Spa","Restaurant","Bar","WiFi","View Decks"],
    rooms:[{type:"Deluxe Room",desc:"Garden/bay view, 38sqm, king bed",rate:9800,capacity:3,avail:6},{type:"Premier Bay View",desc:"Panoramic bay view, king bed, 45sqm",rate:13500,capacity:3,avail:4},{type:"Suite",desc:"Living area, large terrace, full sea views",rate:19000,capacity:4,avail:2},{type:"Overwater Villa",desc:"Exclusive overwater villa, butler, 2 rooms",rate:28000,capacity:6,avail:1}] },
  { id:12, name:"Huma Island Resort & Spa", location:"Busuanga, Coron", area:"Coron", stars:5, price:14000,
    images:["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=75","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70"],
    amenities:["Private Island","Spa","Dive","Restaurant","Kayak","WiFi"],
    rooms:[{type:"Hillside Cottage",desc:"Island panoramic views, private porch",rate:14000,capacity:2,avail:4},{type:"Beachside Cottage",desc:"Beach access, hammock included",rate:17000,capacity:3,avail:3},{type:"Lagoon Water Suite",desc:"Over-lagoon bungalow, plunge pool",rate:24000,capacity:4,avail:2},{type:"Beach Front Villa",desc:"2 rooms, butler, private garden",rate:36000,capacity:6,avail:1}] },
  { id:13, name:"Two Seasons Coron Island Resort", location:"Coron Island", area:"Coron", stars:4, price:7200,
    images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=75","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=600&q=70"],
    amenities:["Pool","Restaurant","Beach Bar","Water Sports","WiFi","Transfer"],
    rooms:[{type:"Deluxe Room",desc:"Tropical garden view, queen bed",rate:7200,capacity:3,avail:5},{type:"Superior Beach Front",desc:"Direct beach access, king bed",rate:9500,capacity:3,avail:3},{type:"Executive Suite",desc:"Living area, sea view, balcony",rate:14000,capacity:4,avail:2},{type:"Private Villa",desc:"Deck, plunge pool, 2 bedrooms",rate:20000,capacity:6,avail:1}] },
  { id:14, name:"Club Paradise Palawan", location:"Dimakya Island, Coron", area:"Coron", stars:5, price:12000,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70"],
    amenities:["Private Island","Dive","Kayak","Spa","Restaurant","Beach"],
    rooms:[{type:"Sea View Room",desc:"Elevated sea views, AC, king bed",rate:12000,capacity:2,avail:4},{type:"Beachfront Cottage",desc:"Directly on the beach, queen bed",rate:15000,capacity:3,avail:3},{type:"Family Cottage",desc:"2 rooms, beach view, children welcome",rate:20000,capacity:5,avail:2},{type:"Deluxe Villa",desc:"Private villa, ocean panorama, terrace",rate:30000,capacity:6,avail:1}] },
  { id:15, name:"Coron Soleil Garden Resort", location:"Coron Town", area:"Coron", stars:3, price:2500,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70"],
    amenities:["Pool","Restaurant","WiFi","Tour Desk","Airport Shuttle","Garden"],
    rooms:[{type:"Standard Room",desc:"Garden view, twin beds, AC",rate:1800,capacity:2,avail:8},{type:"Deluxe Room",desc:"Pool view, queen bed, AC",rate:2500,capacity:3,avail:5},{type:"Superior Room",desc:"Larger, partial bay view",rate:3500,capacity:3,avail:3},{type:"Family Suite",desc:"2 bedrooms, kitchenette, garden patio",rate:5500,capacity:6,avail:2}] },
  { id:16, name:"Sangat Island Dive Resort", location:"Sangat Island, Coron", area:"Coron", stars:4, price:5800,
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=75","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70"],
    amenities:["PADI Dive Center","WWII Wrecks","House Reef","Restaurant","Transfer","WiFi"],
    rooms:[{type:"Cottage",desc:"Jungle-facing cottage, porch, twin beds",rate:4500,capacity:2,avail:5},{type:"Deluxe Cottage",desc:"Larger cottage, sea view, king bed",rate:5800,capacity:3,avail:3},{type:"Beach Cottage",desc:"Beachfront, snorkel direct from room",rate:7500,capacity:3,avail:2},{type:"Family House",desc:"Full house, 3 rooms, private garden",rate:14000,capacity:6,avail:1}] },
  { id:17, name:"Busuanga Bay Lodge", location:"Busuanga, Coron", area:"Coron", stars:3, price:2200,
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["Bay Views","Restaurant","WiFi","Motorcycle Rental","Tour Desk"],
    rooms:[{type:"Budget Room",desc:"Simple, fan-cooled, twin beds",rate:1200,capacity:2,avail:6},{type:"Standard Room",desc:"AC, bay view, queen bed",rate:2200,capacity:2,avail:5},{type:"Deluxe Room",desc:"Larger, panoramic bay view, king",rate:3200,capacity:3,avail:3},{type:"Family Room",desc:"Triple beds, AC, porch",rate:4500,capacity:5,avail:2}] },
  { id:18, name:"Coron Westown Resort", location:"Coron Town", area:"Coron", stars:4, price:3800,
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70"],
    amenities:["Infinity Pool","Restaurant","Spa","WiFi","Dive","Event Space"],
    rooms:[{type:"Deluxe Room",desc:"Pool/garden view, AC, 30sqm",rate:2800,capacity:3,avail:7},{type:"Superior Room",desc:"Bay view, 35sqm, private balcony",rate:3800,capacity:3,avail:4},{type:"Junior Suite",desc:"Separate living area, panoramic views",rate:5800,capacity:4,avail:2},{type:"Family Suite",desc:"2 bedrooms, bay view, kitchenette",rate:8500,capacity:6,avail:1}] },
  { id:19, name:"Coron Island Paradise Resort", location:"Coron Island", area:"Coron", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=800&q=75","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70"],
    amenities:["Beachfront","Snorkeling","Restaurant","Island Tours","WiFi","Hammocks"],
    rooms:[{type:"Garden Room",desc:"Garden-facing room, fan, twin beds",rate:2200,capacity:2,avail:5},{type:"Deluxe Sea View",desc:"Sea view, AC, queen bed",rate:3200,capacity:3,avail:4},{type:"Beachfront Room",desc:"Direct beach access, AC, king",rate:4500,capacity:3,avail:2},{type:"Family Cottage",desc:"Beachfront cottage, 2 rooms, porch",rate:7500,capacity:6,avail:1}] },
  { id:20, name:"Black Island Beach Resort", location:"Coron", area:"Coron", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=800&q=75","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70"],
    amenities:["Snorkeling","Diving","Beach","Restaurant","WiFi","Boat Tours"],
    rooms:[{type:"Standard Cottage",desc:"Beachside cottage, fan, twin",rate:1800,capacity:2,avail:5},{type:"Deluxe Room",desc:"AC room, sea view, queen",rate:2800,capacity:3,avail:3},{type:"Suite",desc:"Living room plus bedroom, ocean views",rate:4500,capacity:4,avail:2},{type:"Family Bungalow",desc:"2 rooms, shared terrace, beach",rate:6500,capacity:6,avail:1}] },
  { id:21, name:"Dos Palmas Island Resort & Spa", location:"Honda Bay, Puerto Princesa", area:"Puerto Princesa", stars:5, price:6500,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70"],
    amenities:["Pool","Spa","Dive Center","Restaurant","WiFi","Private Island"],
    rooms:[{type:"Deluxe Garden Room",desc:"Garden view, king bed, 35sqm",rate:6500,capacity:3,avail:4},{type:"Beach Front Suite",desc:"Direct beach access, ocean view, 48sqm",rate:10500,capacity:3,avail:2},{type:"Water Cottage",desc:"Overwater bungalow, stunning lagoon views",rate:16000,capacity:4,avail:1},{type:"Family Villa",desc:"2 bedrooms, private pool, full sea view",rate:22000,capacity:6,avail:0}] },
  { id:22, name:"Sheridan Beach Resort & Spa", location:"Puerto Princesa", area:"Puerto Princesa", stars:4, price:5500,
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70"],
    amenities:["Beachfront Pool","Spa","Restaurant","Dive Shop","WiFi","Water Sports"],
    rooms:[{type:"Premium Garden Room",desc:"Quiet lush garden setting, queen bed",rate:4200,capacity:2,avail:6},{type:"Deluxe Beach Room",desc:"Beach view, morning sunrise, king",rate:5500,capacity:3,avail:4},{type:"Pool Suite",desc:"Direct pool access, private patio",rate:9000,capacity:4,avail:2},{type:"Beachfront Villa",desc:"Private beach area, 2 rooms, butler",rate:15000,capacity:6,avail:1}] },
  { id:23, name:"Astoria Palawan", location:"Puerto Princesa", area:"Puerto Princesa", stars:4, price:4200,
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Pool","Gym","Restaurant","Bar","WiFi","Shuttle","Conference"],
    rooms:[{type:"Standard",desc:"City view, 28sqm, queen bed",rate:2800,capacity:2,avail:10},{type:"Deluxe",desc:"Pool view, 32sqm, king bed",rate:4200,capacity:3,avail:7},{type:"Junior Suite",desc:"Bay view, 48sqm, sitting area",rate:6500,capacity:4,avail:3},{type:"Executive Suite",desc:"Full bay panorama, 65sqm, butler",rate:9800,capacity:4,avail:1}] },
  { id:24, name:"Princesa Garden Island Resort", location:"Puerto Princesa", area:"Puerto Princesa", stars:4, price:4500,
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Pool","Restaurant","Bar","WiFi","Garden","Airport Transfer"],
    rooms:[{type:"Standard Room",desc:"City/garden view, twin or queen",rate:3200,capacity:2,avail:8},{type:"Deluxe Room",desc:"Pool view, larger space, king",rate:4500,capacity:3,avail:5},{type:"Junior Suite",desc:"Sitting area, mini-bar, garden",rate:6800,capacity:4,avail:3},{type:"Family Suite",desc:"2 bedrooms, full kitchen, garden",rate:8500,capacity:6,avail:2}] },
  { id:25, name:"Palawan Marriott Resort", location:"Puerto Princesa", area:"Puerto Princesa", stars:5, price:8500,
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70"],
    amenities:["Luxury Pool","Spa","Fine Dining","Fitness Center","WiFi","Concierge"],
    rooms:[{type:"Deluxe Room",desc:"City or bay view, 38sqm, king",rate:6500,capacity:2,avail:8},{type:"Premium Room",desc:"Bay view, 44sqm, king bed, balcony",rate:8500,capacity:3,avail:5},{type:"Junior Suite",desc:"Separate lounge, panoramic bay",rate:12000,capacity:4,avail:2},{type:"Presidential Suite",desc:"Top floor, 120sqm, butler service",rate:28000,capacity:6,avail:1}] },
  { id:26, name:"WestCoast Palawan Hotel", location:"Puerto Princesa", area:"Puerto Princesa", stars:3, price:2200,
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=800&q=75","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70"],
    amenities:["Pool","Restaurant","Bar","WiFi","Tour Desk","Airport Transfer"],
    rooms:[{type:"Standard Room",desc:"City view, queen bed, AC",rate:1600,capacity:2,avail:10},{type:"Deluxe Room",desc:"Pool view, larger, king bed",rate:2200,capacity:3,avail:6},{type:"Suite",desc:"Sitting area, bay view, king bed",rate:3800,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, AC, city view",rate:4500,capacity:5,avail:2}] },
  { id:27, name:"Badjao Inn Puerto Princesa", location:"Puerto Princesa City", area:"Puerto Princesa", stars:2, price:1200,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["WiFi","Breakfast Incl.","Tour Desk","Luggage Storage","24h Reception"],
    rooms:[{type:"Budget Room",desc:"Economy room, fan, twin beds",rate:800,capacity:2,avail:10},{type:"Standard Room",desc:"AC room, double bed",rate:1200,capacity:2,avail:8},{type:"Deluxe Room",desc:"Larger AC room, twin or double",rate:1800,capacity:3,avail:4},{type:"Family Room",desc:"3 beds, AC, ensuite bathroom",rate:2800,capacity:5,avail:2}] },
  { id:28, name:"Sabang Beach Resort", location:"Sabang, Puerto Princesa", area:"Puerto Princesa", stars:3, price:2500,
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=800&q=75","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70"],
    amenities:["Beach Access","Underground River Access","Restaurant","WiFi","Firefly Tours"],
    rooms:[{type:"Fan Room",desc:"Basic fan-cooled beach room",rate:1500,capacity:2,avail:6},{type:"AC Beach Room",desc:"AC, sea views, double bed",rate:2500,capacity:3,avail:4},{type:"Deluxe Cottage",desc:"Larger cottage, beach view, AC",rate:3500,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, porch, beach view",rate:5500,capacity:6,avail:1}] },
  { id:29, name:"Puerto Princesa City Hotel", location:"Puerto Princesa City", area:"Puerto Princesa", stars:3, price:2000,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Central","Pool","Restaurant","WiFi","Shuttle","Conference Room"],
    rooms:[{type:"Standard",desc:"City view, AC, double bed",rate:1400,capacity:2,avail:12},{type:"Deluxe",desc:"Larger city view, AC, queen",rate:2000,capacity:3,avail:8},{type:"Junior Suite",desc:"Living area, AC, city panorama",rate:3500,capacity:4,avail:3},{type:"Family Suite",desc:"2 bedrooms, AC, full city view",rate:5500,capacity:6,avail:1}] },
  { id:30, name:"Iwahig River Eco Lodge", location:"Iwahig, Puerto Princesa", area:"Puerto Princesa", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=800&q=75","https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=600&q=70","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=600&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&q=70"],
    amenities:["Firefly Tours","River Kayak","Restaurant","Eco-Friendly","Mangrove","Nature Walks"],
    rooms:[{type:"River Cottage",desc:"Riverside cottage, fan, twin",rate:2200,capacity:2,avail:5},{type:"Deluxe Cottage",desc:"AC, river view, queen bed",rate:3200,capacity:3,avail:4},{type:"Riverside Suite",desc:"Large suite, AC, river panorama",rate:5500,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, AC, river/forest view",rate:8500,capacity:6,avail:1}] },
  { id:31, name:"Long Beach Resort San Vicente", location:"Long Beach, San Vicente", area:"San Vicente", stars:4, price:6800,
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=600&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70"],
    amenities:["14km Beach","Pool","Spa","Restaurant","Surfing","Kite Surfing"],
    rooms:[{type:"Deluxe Room",desc:"Garden or sea view, AC, queen bed",rate:4500,capacity:3,avail:6},{type:"Sea View Suite",desc:"Direct ocean view, private balcony",rate:6800,capacity:4,avail:3},{type:"Beach Villa",desc:"Steps from shore, private deck, king",rate:10000,capacity:4,avail:2},{type:"Family Beach House",desc:"3 bedrooms, full kitchen, private lawn",rate:18000,capacity:6,avail:1}] },
  { id:32, name:"Port Barton Beachcomber Resort", location:"Port Barton, San Vicente", area:"Port Barton", stars:3, price:2200,
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=75","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["Beach","Island Tours","Kayak","Restaurant","Bar","WiFi"],
    rooms:[{type:"Bamboo Hut",desc:"Rustic bamboo hut, fan, double",rate:1200,capacity:2,avail:5},{type:"Standard Room",desc:"Concrete room, fan, garden view",rate:1800,capacity:2,avail:4},{type:"Deluxe Room",desc:"AC, sea view, queen bed",rate:2200,capacity:3,avail:3},{type:"Family Bungalow",desc:"2-room bungalow, sea view, porch",rate:4500,capacity:6,avail:1}] },
  { id:33, name:"Amanpulo Resort Pamalican", location:"Pamalican Island, Palawan", area:"Other Palawan", stars:5, price:85000,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70"],
    amenities:["Ultra Luxury","Private Island","Butler","Spa","Diving","Fine Dining"],
    rooms:[{type:"Beach Casita",desc:"Private beachfront casita, 162sqm",rate:85000,capacity:2,avail:3},{type:"Hillside Casita",desc:"Jungle hilltop casita, panoramic sea",rate:72000,capacity:2,avail:2},{type:"Beach Pool Casita",desc:"Private plunge pool, beachfront",rate:110000,capacity:4,avail:2},{type:"Villa",desc:"Multi-room villa, private pool, butler",rate:180000,capacity:6,avail:1}] },
  { id:34, name:"Flower Island Resort Taytay", location:"Flower Island, Taytay", area:"Other Palawan", stars:4, price:7200,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["Private Island","Snorkeling","Restaurant","Kayak","Diving","Hammocks"],
    rooms:[{type:"Cottage",desc:"Garden-facing cottage, fan, twin",rate:5000,capacity:2,avail:4},{type:"Deluxe Cottage",desc:"Sea view cottage, AC, queen",rate:7200,capacity:3,avail:3},{type:"Sea View Suite",desc:"Panoramic ocean suite, king",rate:10500,capacity:4,avail:2},{type:"Family House",desc:"Full house, 2 rooms, porch, sea",rate:18000,capacity:6,avail:1}] },
  { id:35, name:"Altrove Resort El Nido", location:"Corong-Corong, El Nido", area:"El Nido", stars:4, price:5500,
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70"],
    amenities:["Infinity Pool","Sea View","Restaurant","Bar","WiFi","Tour Packages"],
    rooms:[{type:"Deluxe Room",desc:"Sea view, AC, queen bed, balcony",rate:4000,capacity:3,avail:6},{type:"Premium Room",desc:"Panoramic sea view, king, 40sqm",rate:5500,capacity:3,avail:4},{type:"Sea View Suite",desc:"Living area, wrap-around balcony",rate:8500,capacity:4,avail:2},{type:"Sky Villa",desc:"Rooftop villa, 360 views, plunge pool",rate:15000,capacity:6,avail:1}] },
  { id:36, name:"El Nido Mahogany Beach Resort", location:"El Nido Town", area:"El Nido", stars:3, price:3500,
    images:["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=75","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Beach","Restaurant","Bar","WiFi","Island Tours","Hammocks"],
    rooms:[{type:"Standard Room",desc:"Garden view, fan, double bed",rate:2200,capacity:2,avail:7},{type:"Deluxe Room",desc:"Sea view, AC, queen bed",rate:3500,capacity:3,avail:5},{type:"Superior Room",desc:"Large room, sea view, balcony",rate:4800,capacity:3,avail:2},{type:"Family Cottage",desc:"2 rooms, beach view, AC",rate:7000,capacity:6,avail:1}] },
  { id:37, name:"Bacuit Bay Boutique Hotel", location:"El Nido Town", area:"El Nido", stars:4, price:4800,
    images:["https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Rooftop Pool","Bay Views","Restaurant","Bar","Spa","WiFi"],
    rooms:[{type:"Standard",desc:"Bay view room, AC, queen bed",rate:3500,capacity:2,avail:8},{type:"Deluxe Bay View",desc:"Panoramic bay view, king bed",rate:4800,capacity:3,avail:5},{type:"Junior Suite",desc:"Balcony suite, full bay view",rate:7500,capacity:4,avail:2},{type:"Penthouse Suite",desc:"Top floor, 360 views, rooftop access",rate:14000,capacity:4,avail:1}] },
  { id:38, name:"Lio Estate Resort El Nido", location:"Lio, El Nido", area:"El Nido", stars:5, price:9500,
    images:["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Beachfront","Spa","Pool","Restaurants","Eco Tours","Yoga"],
    rooms:[{type:"Forest Room",desc:"Jungle-view, eco cottage, AC",rate:7000,capacity:2,avail:5},{type:"Deluxe Beach Room",desc:"Beachfront, AC, king bed",rate:9500,capacity:3,avail:4},{type:"Beach Villa",desc:"Private porch, direct beach, 2 rooms",rate:14000,capacity:4,avail:2},{type:"Family Beach House",desc:"Full family house, 3 rooms, garden",rate:22000,capacity:6,avail:1}] },
  { id:39, name:"Nacpan Glamping Hideaway", location:"Nacpan, El Nido", area:"El Nido", stars:3, price:5200,
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=75","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Glamping Tents","Breakfast","Beach","Hammocks","Kayak","Stargazing"],
    rooms:[{type:"Dome Tent",desc:"Geodesic dome tent on the beach, queen",rate:3500,capacity:2,avail:5},{type:"Safari Tent",desc:"Spacious safari tent, private deck",rate:5200,capacity:3,avail:4},{type:"Treehouse",desc:"Elevated treehouse, sea views, queen",rate:7800,capacity:3,avail:2},{type:"Family Safari",desc:"Mega tent, 2 sleeping areas, porch",rate:10500,capacity:6,avail:1}] },
  { id:40, name:"Cadlao Lagoon Retreat", location:"Cadlao Island, El Nido", area:"El Nido", stars:4, price:8500,
    images:["https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=800&q=75","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Private Lagoon","Kayak","Yoga","Restaurant","Hammocks","Guided Hikes"],
    rooms:[{type:"Garden Cottage",desc:"Lush garden cottage, AC, queen",rate:6500,capacity:2,avail:4},{type:"Lagoon View",desc:"Lagoon-facing room, AC, king bed",rate:8500,capacity:3,avail:3},{type:"Lagoon Villa",desc:"Private villa, plunge pool, 2 beds",rate:14000,capacity:4,avail:2},{type:"Family House",desc:"Full house, lagoon access, 3 rooms",rate:22000,capacity:6,avail:1}] },
  { id:41, name:"Coron Divers Lodge", location:"Coron Town", area:"Coron", stars:3, price:2000,
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=75","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70"],
    amenities:["Dive Shop","Equipment Rental","Wreck Tours","WiFi","Restaurant","Tank Fill"],
    rooms:[{type:"Diver Budget",desc:"Fan room, equipment storage, twin",rate:1200,capacity:2,avail:8},{type:"Standard Dive Room",desc:"AC, storage, queen bed",rate:2000,capacity:2,avail:6},{type:"Deluxe Room",desc:"Larger AC room, sea view, queen",rate:3000,capacity:3,avail:3},{type:"Dive Suite",desc:"Suite with lounge, dive storage, AC",rate:5000,capacity:4,avail:1}] },
  { id:42, name:"Coron La Maison Blanche", location:"Coron Town", area:"Coron", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["French Boutique","Pool","Restaurant","WiFi","Tour Desk","Rooftop"],
    rooms:[{type:"Classic Room",desc:"Colonial charm, queen bed, AC",rate:2000,capacity:2,avail:7},{type:"Deluxe Room",desc:"Bay view, AC, king bed, 35sqm",rate:2800,capacity:3,avail:5},{type:"Junior Suite",desc:"Separate lounge, terrace, bay view",rate:4500,capacity:4,avail:2},{type:"Family Suite",desc:"2 bedrooms, full bay view, porch",rate:7500,capacity:6,avail:1}] },
  { id:43, name:"Malcapuya Island Beach Resort", location:"Malcapuya Island, Coron", area:"Coron", stars:3, price:3800,
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["Private Island","White Sand","Snorkeling","Restaurant","Kayak","Hammocks"],
    rooms:[{type:"Beach Cottage",desc:"Beachside cottage, fan, twin beds",rate:2800,capacity:2,avail:5},{type:"Deluxe Cottage",desc:"AC cottage, direct beach access, queen",rate:3800,capacity:3,avail:3},{type:"Family Cottage",desc:"2 rooms, beachfront, AC, porch",rate:7000,capacity:5,avail:2},{type:"Exclusive Villa",desc:"Private villa, entire beach section",rate:15000,capacity:6,avail:1}] },
  { id:44, name:"Coron Backpacker Guesthouse", location:"Coron Town", area:"Coron", stars:2, price:900,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["WiFi","Shared Kitchen","Tour Desk","Locker","Common Area","Rooftop"],
    rooms:[{type:"Dorm Bed 8-bed",desc:"Mixed dorm, AC, lockers",rate:450,capacity:1,avail:12},{type:"Dorm Bed 4-bed",desc:"Small dorm, AC, 4 beds",rate:650,capacity:1,avail:6},{type:"Private Room",desc:"Small private room, fan, double",rate:900,capacity:2,avail:5},{type:"En-Suite Room",desc:"Private, AC, ensuite bathroom",rate:1500,capacity:2,avail:3}] },
  { id:45, name:"Bulog Dos Resort", location:"Bulog Dos Island, Coron", area:"Coron", stars:3, price:3500,
    images:["https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70"],
    amenities:["Sandbar","Snorkeling","Restaurant","Kayak","Beach","Hammocks"],
    rooms:[{type:"Standard Cottage",desc:"Beach cottage, fan, twin beds",rate:2200,capacity:2,avail:4},{type:"Deluxe Cottage",desc:"AC, sea view, queen bed",rate:3500,capacity:3,avail:3},{type:"Sea View Suite",desc:"Larger room, panoramic sea, balcony",rate:5500,capacity:4,avail:1},{type:"Family Bungalow",desc:"2 rooms, beachfront, AC",rate:8000,capacity:6,avail:1}] },
  { id:46, name:"El Nido Tropical Inn", location:"El Nido Town", area:"El Nido", stars:2, price:1800,
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=800&q=75","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["WiFi","Restaurant","Tour Desk","Rooftop","24h Reception"],
    rooms:[{type:"Fan Room",desc:"Fan-cooled, twin or double bed",rate:1100,capacity:2,avail:8},{type:"AC Room",desc:"Air-conditioned, double bed",rate:1800,capacity:2,avail:6},{type:"Deluxe Room",desc:"AC, sea view, queen bed",rate:2400,capacity:3,avail:3},{type:"Family Room",desc:"3 beds, AC, garden view",rate:4000,capacity:5,avail:2}] },
  { id:47, name:"Corong-Corong Beach Resort", location:"Corong-Corong, El Nido", area:"El Nido", stars:3, price:3800,
    images:["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Beach","Sunset Views","Restaurant","Bar","WiFi","Island Tours"],
    rooms:[{type:"Standard Room",desc:"Beach area, fan, double bed",rate:2500,capacity:2,avail:6},{type:"Deluxe Room",desc:"Sea view, AC, queen bed",rate:3800,capacity:3,avail:4},{type:"Suite",desc:"Living room plus bedroom, sea view",rate:6200,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, porch, sea view, AC",rate:9000,capacity:6,avail:1}] },
  { id:48, name:"Sibaltan Beach Eco Lodge", location:"Sibaltan, El Nido", area:"El Nido", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=800&q=75","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70"],
    amenities:["Eco-Friendly","Kitesurfing","Beach","Restaurant","Solar Power","Local Tours"],
    rooms:[{type:"Eco Hut",desc:"Bamboo eco hut, fan, double bed",rate:1800,capacity:2,avail:5},{type:"Deluxe Eco Room",desc:"Larger eco room, AC, queen",rate:2800,capacity:3,avail:3},{type:"Beachfront Room",desc:"Direct beach access, AC, king",rate:4200,capacity:3,avail:2},{type:"Family Eco Cottage",desc:"2 rooms, solar AC, private porch",rate:6500,capacity:6,avail:1}] },
  { id:49, name:"Pandan Island Resort", location:"Pandan Island, Puerto Princesa", area:"Puerto Princesa", stars:4, price:5500,
    images:["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=75","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70"],
    amenities:["Private Island","Snorkeling","Dive","Restaurant","Beach","Boat Transfer"],
    rooms:[{type:"Cottage",desc:"Beachside cottage, fan, twin bed",rate:4000,capacity:2,avail:5},{type:"Deluxe Cottage",desc:"AC, sea view, queen bed",rate:5500,capacity:3,avail:4},{type:"Suite",desc:"Large suite, panoramic sea, deck",rate:8500,capacity:4,avail:2},{type:"Family Villa",desc:"Private villa, beach, 2 rooms",rate:15000,capacity:6,avail:1}] },
  { id:50, name:"Ugong Rock Adventure Resort", location:"Ugong, Puerto Princesa", area:"Puerto Princesa", stars:3, price:3000,
    images:["https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=75","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=600&q=70","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=600&q=70"],
    amenities:["Zipline Access","Cave Tour","Restaurant","Nature Walks","WiFi","Farm"],
    rooms:[{type:"Nipa Hut",desc:"Traditional hut, fan, twin beds",rate:2000,capacity:2,avail:5},{type:"Deluxe Room",desc:"AC room, garden view, queen",rate:3000,capacity:3,avail:4},{type:"Cottage",desc:"Private cottage, jungle view, AC",rate:4500,capacity:4,avail:2},{type:"Family Cottage",desc:"Large cottage, 2 rooms, AC",rate:7000,capacity:6,avail:1}] },
  { id:51, name:"El Nido Blue Orchid Hotel", location:"El Nido Town", area:"El Nido", stars:3, price:3500,
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70"],
    amenities:["Pool","Bay Views","Restaurant","Bar","Tour Desk","WiFi","Spa"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, double bed",rate:2500,capacity:2,avail:7},{type:"Deluxe Bay View",desc:"Bay view, AC, queen bed",rate:3500,capacity:3,avail:5},{type:"Deluxe Plus",desc:"Larger room, balcony, bay view",rate:5000,capacity:3,avail:2},{type:"Family Suite",desc:"2 rooms, bay view, kitchenette",rate:8000,capacity:6,avail:1}] },
  { id:52, name:"Coron Sunset Resort", location:"Coron Town", area:"Coron", stars:3, price:3000,
    images:["https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=800&q=75","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=600&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=600&q=70"],
    amenities:["Sunset Views","Infinity Pool","Restaurant","Bar","WiFi","Rooftop Terrace"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, queen bed",rate:2200,capacity:2,avail:8},{type:"Sunset View",desc:"West-facing, panoramic sunsets, king",rate:3000,capacity:3,avail:5},{type:"Deluxe Suite",desc:"Large suite, wrap-around sunset view",rate:5500,capacity:4,avail:2},{type:"Family Suite",desc:"2 rooms, sunset balcony, kitchenette",rate:8500,capacity:6,avail:1}] },
  { id:53, name:"El Nido Viewpoint Resort", location:"El Nido Town", area:"El Nido", stars:3, price:4000,
    images:["https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=75","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70"],
    amenities:["Panoramic Views","Pool","Restaurant","Bar","WiFi","Viewdeck"],
    rooms:[{type:"Hillside Room",desc:"Hilltop room, sea view, queen",rate:2800,capacity:2,avail:6},{type:"Deluxe View Room",desc:"Panoramic view, king bed, balcony",rate:4000,capacity:3,avail:4},{type:"Suite",desc:"Suite, 270-degree view, living area",rate:7000,capacity:4,avail:2},{type:"Penthouse",desc:"Top floor, wrap-around views, butler",rate:15000,capacity:5,avail:1}] },
  { id:54, name:"Coron Reef Lodge", location:"Coron Town", area:"Coron", stars:3, price:2600,
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=75","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70"],
    amenities:["Dive","Snorkel","Restaurant","WiFi","Tour Desk","Rooftop Pool"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, double bed",rate:1800,capacity:2,avail:8},{type:"Deluxe Room",desc:"Bay view, AC, queen bed, 32sqm",rate:2600,capacity:3,avail:5},{type:"Superior",desc:"Larger room, panoramic bay view",rate:3800,capacity:3,avail:3},{type:"Family Room",desc:"3 beds, kitchenette, bay view",rate:5500,capacity:6,avail:1}] },
  { id:55, name:"El Nido Starlight Glamping", location:"Nacpan Beach, El Nido", area:"El Nido", stars:3, price:6000,
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70"],
    amenities:["Stargazing","Beach","Transparent Dome","Breakfast","WiFi","Hammocks"],
    rooms:[{type:"Starlight Dome",desc:"Transparent dome, AC, sea and sky view",rate:6000,capacity:2,avail:4},{type:"Premium Dome",desc:"Larger dome, private deck, AC",rate:8500,capacity:3,avail:3},{type:"Family Dome",desc:"Extra-large dome, 2 beds, AC, porch",rate:12000,capacity:4,avail:2},{type:"Starlight Cottage",desc:"Solid cottage, AC, beach view, deck",rate:9500,capacity:4,avail:1}] },
  { id:56, name:"Coron Mimaropa Resort", location:"Coron Town", area:"Coron", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["Pool","Bay Views","Restaurant","Spa","WiFi","Tour Desk","Dive Access"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, double bed",rate:2200,capacity:2,avail:7},{type:"Deluxe Room",desc:"Bay view, AC, queen bed",rate:3200,capacity:3,avail:5},{type:"Junior Suite",desc:"Living area, panoramic bay view",rate:5500,capacity:4,avail:2},{type:"Family Suite",desc:"2 bedrooms, bay view, kitchenette",rate:8500,capacity:6,avail:1}] },
  { id:57, name:"El Nido Water Villas", location:"Bacuit Bay, El Nido", area:"El Nido", stars:5, price:18000,
    images:["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=75","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70"],
    amenities:["Overwater Villas","Dive","Spa","Fine Dining","Kayak","Butler"],
    rooms:[{type:"Water Villa",desc:"Overwater villa, direct sea access",rate:18000,capacity:2,avail:3},{type:"Deluxe Water Villa",desc:"Larger overwater, private deck, king",rate:24000,capacity:3,avail:2},{type:"Lagoon Suite",desc:"Over-lagoon suite, plunge pool",rate:32000,capacity:4,avail:1},{type:"Family Water House",desc:"2-level overwater, 3 beds, butler",rate:48000,capacity:6,avail:1}] },
  { id:58, name:"Twin Lagoon Eco Retreat", location:"Coron Island, Coron", area:"Coron", stars:4, price:8500,
    images:["https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=75","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["Twin Lagoon Access","Kayaking","Snorkeling","Restaurant","WiFi","Boat Tours"],
    rooms:[{type:"Lagoon Cottage",desc:"Lagoon-facing cottage, fan, queen",rate:6000,capacity:2,avail:4},{type:"Deluxe Lagoon",desc:"AC cottage, panoramic lagoon",rate:8500,capacity:3,avail:3},{type:"Lagoon Suite",desc:"Large suite, private lagoon deck",rate:14000,capacity:4,avail:2},{type:"Family Lagoon House",desc:"2 rooms, full lagoon view, porch",rate:22000,capacity:6,avail:1}] },
  { id:59, name:"Kayangan Lake View Resort", location:"Coron Island, Coron", area:"Coron", stars:4, price:7500,
    images:["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=75","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70","https://images.unsplash.com/photo-1531761535209-83bb37a2d5d2?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70"],
    amenities:["Kayangan Lake Access","Viewdeck","Restaurant","Kayak","WiFi","Guide Service"],
    rooms:[{type:"Lake View Room",desc:"Kayangan view, AC, queen bed",rate:5500,capacity:2,avail:4},{type:"Deluxe Lake View",desc:"Full lake panorama, king bed, AC",rate:7500,capacity:3,avail:3},{type:"Suite",desc:"Panoramic suite, separate lounge, AC",rate:12000,capacity:4,avail:2},{type:"Family House",desc:"2 rooms, lake view, AC, porch",rate:18000,capacity:6,avail:1}] },
  { id:60, name:"Cowrie Island Resort Honda Bay", location:"Cowrie Island, Puerto Princesa", area:"Puerto Princesa", stars:3, price:3500,
    images:["https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Private Island","Snorkeling","Restaurant","Beach Volleyball","WiFi","Boat Transfer"],
    rooms:[{type:"Beach Cottage",desc:"Beachfront cottage, fan, twin",rate:2500,capacity:2,avail:5},{type:"Deluxe Cottage",desc:"AC, beach view, queen bed",rate:3500,capacity:3,avail:3},{type:"Sea View Suite",desc:"Panoramic suite, AC, king",rate:5500,capacity:4,avail:2},{type:"Family House",desc:"2 rooms, AC, island-front porch",rate:9000,capacity:6,avail:1}] },
  { id:61, name:"San Vicente Beach Club & Inn", location:"San Vicente, Palawan", area:"San Vicente", stars:3, price:3500,
    images:["https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=70"],
    amenities:["14km Beach","Restaurant","Bar","Surfing","WiFi","Island Tours"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, queen bed",rate:2500,capacity:2,avail:6},{type:"Deluxe Beach Room",desc:"Beach view, AC, king bed",rate:3500,capacity:3,avail:4},{type:"Beach Suite",desc:"Panoramic suite, private terrace",rate:6000,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, beach access, AC, porch",rate:10000,capacity:6,avail:1}] },
  { id:62, name:"Taytay Fort View Inn", location:"Taytay, Palawan", area:"Other Palawan", stars:3, price:2500,
    images:["https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=800&q=75","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=600&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Fort Views","Bay Views","Restaurant","WiFi","Historical Tours","Boat Trips"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, queen bed",rate:1800,capacity:2,avail:6},{type:"Bay View Room",desc:"Bay and fort view, AC, king bed",rate:2500,capacity:3,avail:4},{type:"Suite",desc:"Panoramic suite, balcony, AC",rate:4200,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, bay view, AC",rate:6000,capacity:5,avail:1}] },
  { id:63, name:"Busuanga Wilderness Camp", location:"Busuanga Island, Coron", area:"Coron", stars:3, price:3800,
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=75","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=600&q=70"],
    amenities:["Wildlife Tours","Birding","Kayak","Restaurant","Eco Camp","Motorboat"],
    rooms:[{type:"Eco Tent",desc:"Raised eco tent, fan, twin beds",rate:2500,capacity:2,avail:5},{type:"Glamping Tent",desc:"Deluxe tent, AC, queen, deck",rate:3800,capacity:3,avail:4},{type:"Jungle Cottage",desc:"Bamboo cottage, AC, forest view",rate:5500,capacity:4,avail:2},{type:"Family Tent",desc:"2-room tent complex, AC, porch",rate:9000,capacity:6,avail:1}] },
  { id:64, name:"Mitra's Ranch Farm Resort", location:"Santa Lourdes, Puerto Princesa", area:"Puerto Princesa", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=75","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=70"],
    amenities:["Farm Tour","Swimming Pool","Restaurant","Horse Riding","WiFi","Nature Walks"],
    rooms:[{type:"Bamboo Cottage",desc:"Farm-view cottage, twin beds, fan",rate:1800,capacity:2,avail:5},{type:"Deluxe Cottage",desc:"AC cottage, garden view, queen",rate:2800,capacity:3,avail:4},{type:"Family Cottage",desc:"2 rooms, farm and mountain views",rate:5000,capacity:6,avail:2},{type:"Farmhouse Suite",desc:"Entire suite, panoramic farm views",rate:7500,capacity:5,avail:1}] },
  { id:65, name:"El Nido Cliff Side Villa", location:"El Nido Town", area:"El Nido", stars:4, price:7800,
    images:["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70"],
    amenities:["Cliff Views","Private Pool","Concierge","Chef Service","WiFi","Transfer"],
    rooms:[{type:"Deluxe Room",desc:"Cliff-edge room, AC, king bed",rate:5500,capacity:2,avail:4},{type:"Premium Room",desc:"Panoramic sea and cliff view, king",rate:7800,capacity:3,avail:3},{type:"Cliff Villa",desc:"Private villa, infinity pool, 2 rooms",rate:15000,capacity:4,avail:2},{type:"Grand Villa",desc:"Entire villa unit, 3 rooms, chef",rate:28000,capacity:6,avail:1}] },
  { id:66, name:"Coron Narra Eco-Lodge", location:"Busuanga, Coron", area:"Coron", stars:3, price:3000,
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=75","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=600&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=600&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&q=70"],
    amenities:["Eco-Friendly","Mangrove Kayak","Birdwatching","Restaurant","WiFi","Nature Trails"],
    rooms:[{type:"Eco Hut",desc:"Nipa hut, solar fan, twin bed",rate:2000,capacity:2,avail:5},{type:"Deluxe Eco",desc:"Larger hut, AC, queen bed",rate:3000,capacity:3,avail:4},{type:"Treehouse",desc:"Elevated treehouse, fan, queen",rate:4500,capacity:3,avail:2},{type:"Family Eco House",desc:"2-room eco house, AC, nature view",rate:8000,capacity:6,avail:1}] },
  { id:67, name:"Luli Island Sandbar Retreat", location:"Honda Bay, Puerto Princesa", area:"Puerto Princesa", stars:3, price:4500,
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=75","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Sandbar Island","Snorkeling","Restaurant","Tidal Pool","Beach","Kayak"],
    rooms:[{type:"Beach Cottage",desc:"Sandbar-side cottage, fan, twin",rate:3000,capacity:2,avail:4},{type:"Deluxe Cottage",desc:"AC cottage, sandbar view, queen",rate:4500,capacity:3,avail:3},{type:"Sea Suite",desc:"Panoramic suite, AC, king bed",rate:7000,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, sandbar access, porch",rate:10000,capacity:6,avail:1}] },
  { id:68, name:"El Nido Art Cafe & Inn", location:"El Nido Town", area:"El Nido", stars:2, price:2000,
    images:["https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=800&q=75","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=600&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=70","https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=600&q=70"],
    amenities:["Art Gallery","Cafe","WiFi","Cozy Lounge","Tour Bookings"],
    rooms:[{type:"Cozy Room",desc:"Artsy room, fan, queen bed",rate:1400,capacity:2,avail:6},{type:"Deluxe Room",desc:"Art-decorated, AC, queen bed",rate:2000,capacity:2,avail:4},{type:"Studio",desc:"AC studio, kitchenette, queen",rate:2800,capacity:3,avail:2},{type:"Family Room",desc:"3 beds, AC, colorful art decor",rate:4500,capacity:5,avail:1}] },
  { id:69, name:"Coron Royal Dutch Inn", location:"Coron Town", area:"Coron", stars:3, price:2400,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["Dutch Managed","WiFi","Restaurant","Tour Desk","Dive Packages","Rooftop"],
    rooms:[{type:"Standard Room",desc:"Garden view, fan or AC, queen",rate:1600,capacity:2,avail:8},{type:"Deluxe Room",desc:"Bay view, AC, king bed",rate:2400,capacity:3,avail:5},{type:"Superior Room",desc:"Larger bay view, AC, balcony",rate:3500,capacity:3,avail:3},{type:"Family Room",desc:"3 beds, AC, bay view, porch",rate:5200,capacity:5,avail:1}] },
  { id:70, name:"El Nido Rainforest Resort", location:"Lio, El Nido", area:"El Nido", stars:4, price:7500,
    images:["https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=800&q=75","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=70"],
    amenities:["Jungle Setting","Pool","Spa","Restaurant","Hiking","Wildlife Tours"],
    rooms:[{type:"Forest Room",desc:"Jungle-view room, AC, queen bed",rate:5500,capacity:2,avail:5},{type:"Deluxe Treehouse",desc:"Elevated treehouse, AC, sea view",rate:7500,capacity:3,avail:3},{type:"Treehouse Suite",desc:"2-floor treehouse, AC, private deck",rate:12000,capacity:4,avail:2},{type:"Family Tree Cottage",desc:"Large cottage, 3 rooms, forest view",rate:18000,capacity:6,avail:1}] },
  { id:71, name:"Coron Bay Budget Inn", location:"Coron Town", area:"Coron", stars:2, price:1300,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["WiFi","Tour Desk","24h Reception","Budget-Friendly","Near Market"],
    rooms:[{type:"Fan Room",desc:"Basic fan room, twin bed",rate:800,capacity:2,avail:12},{type:"AC Room",desc:"AC, double bed, ensuite",rate:1300,capacity:2,avail:8},{type:"Deluxe AC",desc:"Larger AC room, queen bed",rate:1900,capacity:3,avail:4},{type:"Family Room",desc:"3 beds, AC, window view",rate:3200,capacity:5,avail:2}] },
  { id:72, name:"Underground River Jungle Lodge", location:"Sabang, Puerto Princesa", area:"Puerto Princesa", stars:3, price:3800,
    images:["https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=800&q=75","https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600&q=70","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=600&q=70"],
    amenities:["Underground River Access","Jungle","Beach","Restaurant","WiFi","Nature Walks"],
    rooms:[{type:"Jungle Room",desc:"Jungle-view, fan, twin beds",rate:2500,capacity:2,avail:6},{type:"Deluxe Jungle",desc:"AC, jungle and sea view, queen",rate:3800,capacity:3,avail:4},{type:"Beach Cottage",desc:"Beachfront, AC, king bed",rate:5500,capacity:4,avail:2},{type:"Family Jungle House",desc:"2 rooms, AC, jungle/beach views",rate:9000,capacity:6,avail:1}] },
  { id:73, name:"Coron Seadive Resort", location:"Coron Town", area:"Coron", stars:3, price:2500,
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=75","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70"],
    amenities:["WWII Dive","Wreck Tours","Restaurant","WiFi","Dive Packages","Equipment"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, double bed",rate:1700,capacity:2,avail:8},{type:"Deluxe Room",desc:"Bay view, AC, queen bed",rate:2500,capacity:3,avail:5},{type:"Dive Suite",desc:"Large room, dive storage, sea view",rate:4000,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, bay view, dive storage",rate:6000,capacity:5,avail:1}] },
  { id:74, name:"Palawan Heritage Inn", location:"Puerto Princesa", area:"Puerto Princesa", stars:3, price:2200,
    images:["https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=75","https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=600&q=70","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=600&q=70","https://images.unsplash.com/photo-1476224203421-9ac39bcb3df1?w=600&q=70"],
    amenities:["Cultural Tours","Museum Access","Restaurant","WiFi","Heritage Building","Garden"],
    rooms:[{type:"Classic Room",desc:"Heritage-style room, AC, queen",rate:1600,capacity:2,avail:8},{type:"Deluxe Heritage",desc:"Larger heritage room, AC, king",rate:2200,capacity:3,avail:5},{type:"Heritage Suite",desc:"Full suite, antique decor, bay view",rate:4000,capacity:4,avail:2},{type:"Family Heritage",desc:"2 rooms, cultural decor, garden",rate:6500,capacity:6,avail:1}] },
  { id:75, name:"El Nido Hidden Garden Inn", location:"El Nido Town", area:"El Nido", stars:2, price:1800,
    images:["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=75","https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=70","https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=600&q=70","https://images.unsplash.com/photo-1504449239043-5f0ac6e1c6c4?w=600&q=70"],
    amenities:["Garden","Restaurant","WiFi","Tour Desk","Lush Grounds","Local Charm"],
    rooms:[{type:"Standard Room",desc:"Garden view, fan, double bed",rate:1200,capacity:2,avail:7},{type:"AC Room",desc:"AC, garden view, queen bed",rate:1800,capacity:2,avail:5},{type:"Deluxe",desc:"Larger AC room, garden, queen",rate:2500,capacity:3,avail:3},{type:"Family Room",desc:"3 beds, AC, garden terrace",rate:4000,capacity:5,avail:1}] },
  { id:76, name:"Coron Paradise Pensionne", location:"Coron Town", area:"Coron", stars:2, price:1200,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["WiFi","Tour Desk","24h Reception","Budget Friendly","Central Location"],
    rooms:[{type:"Fan Room",desc:"Basic fan room, single/double",rate:800,capacity:2,avail:12},{type:"AC Room",desc:"Air-conditioned, double bed",rate:1200,capacity:2,avail:8},{type:"Deluxe AC",desc:"Larger AC room, queen bed",rate:1800,capacity:3,avail:4},{type:"Family Room",desc:"3 beds, AC, ensuite",rate:3000,capacity:5,avail:2}] },
  { id:77, name:"Calauit Safari Lodge Busuanga", location:"Calauit, Busuanga", area:"Coron", stars:3, price:4500,
    images:["https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=75","https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&q=70","https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&q=70","https://images.unsplash.com/photo-1547721064-da6cfb341d50?w=600&q=70"],
    amenities:["Safari Access","Wildlife Viewing","Restaurant","WiFi","Nature Walks","Unique Experience"],
    rooms:[{type:"Safari Tent",desc:"Luxury safari tent, AC, twin beds",rate:3500,capacity:2,avail:5},{type:"Deluxe Safari",desc:"Larger tent, AC, queen bed",rate:4500,capacity:3,avail:4},{type:"Safari Suite",desc:"Large suite tent, lounge area",rate:7000,capacity:4,avail:2},{type:"Family Safari",desc:"Multi-tent family unit, 2 rooms",rate:12000,capacity:6,avail:1}] },
  { id:78, name:"El Nido Budget Surfer Hostel", location:"Duli Beach, El Nido", area:"El Nido", stars:2, price:1200,
    images:["https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70"],
    amenities:["Surf Lessons","Board Rental","Beach Bar","WiFi","Hammocks","Bonfire"],
    rooms:[{type:"Dorm Bed",desc:"Surf dorm, 6 beds, fan, lockers",rate:600,capacity:1,avail:12},{type:"Private Fan",desc:"Private room, fan, twin beds",rate:1200,capacity:2,avail:5},{type:"Private AC",desc:"AC private room, double bed",rate:1800,capacity:2,avail:3},{type:"Surf Cottage",desc:"Small cottage, beachside, fan",rate:2500,capacity:3,avail:2}] },
  { id:79, name:"Palawan Firefly Camp", location:"Iwahig River, Puerto Princesa", area:"Puerto Princesa", stars:3, price:4200,
    images:["https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=800&q=75","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=600&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70","https://images.unsplash.com/photo-1501786223405-6d024d7c3b8d?w=600&q=70"],
    amenities:["Nightly Firefly Tours","River","Restaurant","Glamping","WiFi","Stargazing"],
    rooms:[{type:"Glamping Tent",desc:"Riverside glamping tent, queen bed",rate:2800,capacity:2,avail:6},{type:"Deluxe Tent",desc:"Larger tent, AC, river view",rate:4200,capacity:3,avail:4},{type:"River Cottage",desc:"Cottage, AC, porch, firefly view",rate:6500,capacity:4,avail:2},{type:"Family Tent House",desc:"2-room tent complex, AC, river",rate:10000,capacity:6,avail:1}] },
  { id:80, name:"Coron Adventure Basecamp", location:"Coron Town", area:"Coron", stars:2, price:1600,
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=75","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70"],
    amenities:["Adventure Tours","Motorboat","Cliff Jump","WiFi","Restaurant","Dive"],
    rooms:[{type:"Dorm",desc:"8-bed dorm, fan, lockers",rate:500,capacity:1,avail:14},{type:"Private Fan",desc:"Private room, fan, double bed",rate:1000,capacity:2,avail:7},{type:"Private AC",desc:"AC room, queen bed, ensuite",rate:1600,capacity:2,avail:4},{type:"Family Room",desc:"3 beds, AC, adventure view",rate:3200,capacity:5,avail:2}] },
  { id:81, name:"El Nido Island View Lodge", location:"El Nido Town", area:"El Nido", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70"],
    amenities:["Island Views","Pool","Restaurant","Bar","WiFi","Tour Packages"],
    rooms:[{type:"Standard",desc:"Town/island view, AC, double",rate:2200,capacity:2,avail:8},{type:"Deluxe",desc:"Panoramic island view, king bed",rate:3200,capacity:3,avail:6},{type:"Suite",desc:"Large suite, 270-degree island view",rate:5500,capacity:4,avail:2},{type:"Family Suite",desc:"2 bedrooms, island/sea view, AC",rate:8500,capacity:6,avail:1}] },
  { id:82, name:"Coron Bay Hostel & Dive", location:"Coron Town", area:"Coron", stars:2, price:1000,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70"],
    amenities:["Dive Shop","WiFi","Shared Kitchen","Common Lounge","Tour Booking"],
    rooms:[{type:"Dorm 6-bed",desc:"Mixed dorm, AC, lockers, 6 beds",rate:500,capacity:1,avail:8},{type:"Dorm 4-bed",desc:"Small dorm, AC, 4 beds, lockers",rate:650,capacity:1,avail:6},{type:"Private Room",desc:"Private room, fan, double bed",rate:1000,capacity:2,avail:5},{type:"En-Suite Room",desc:"Private, AC, ensuite bathroom",rate:1500,capacity:2,avail:3}] },
  { id:83, name:"Palawan Horizon Luxury Camp", location:"El Nido Environs", area:"El Nido", stars:5, price:25000,
    images:["https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=75","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70"],
    amenities:["Ultra Luxury","Infinity Pool","Chef","Spa","Concierge","Private Transfer"],
    rooms:[{type:"Luxury Tent",desc:"Ultimate luxury tent, AC, 60sqm, king",rate:18000,capacity:2,avail:3},{type:"Premium Tent",desc:"Larger luxury tent, sea view, 80sqm",rate:25000,capacity:3,avail:2},{type:"Grand Tent",desc:"Mega tent, lounge, private pool, 120sqm",rate:38000,capacity:4,avail:2},{type:"Presidential Villa",desc:"Full villa, 3 rooms, butler, chef",rate:80000,capacity:6,avail:1}] },
  { id:84, name:"Balabac Island Base Camp", location:"Balabac, South Palawan", area:"Other Palawan", stars:3, price:5000,
    images:["https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=75","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Island Hopping","Pristine Reefs","Restaurant","Boat","Snorkeling","Unique Location"],
    rooms:[{type:"Tent Camp",desc:"Glamping tent, fan, twin beds",rate:3500,capacity:2,avail:5},{type:"Jungle Cottage",desc:"Bamboo cottage, fan, queen",rate:5000,capacity:3,avail:3},{type:"Sea View Cottage",desc:"AC cottage, sea panorama",rate:7500,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, AC, private porch, sea",rate:12000,capacity:6,avail:1}] },
  { id:85, name:"El Nido Sunrise Beach Cottages", location:"El Nido Town", area:"El Nido", stars:2, price:2000,
    images:["https://images.unsplash.com/photo-1453685823441-b5de0e7c1a42?w=800&q=75","https://images.unsplash.com/photo-1475919892000-4f34b91f4a01?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70"],
    amenities:["Beach Cottages","Sunrise Views","Restaurant","Tour Desk","WiFi","Hammocks"],
    rooms:[{type:"Beach Cottage",desc:"Simple beach cottage, fan, twin",rate:1300,capacity:2,avail:8},{type:"Deluxe Cottage",desc:"Larger cottage, AC, sea view",rate:2000,capacity:3,avail:5},{type:"Sea View Cottage",desc:"Premium cottage, AC, panoramic sea",rate:3000,capacity:3,avail:3},{type:"Family Cottage",desc:"2-room cottage, AC, beach access",rate:5500,capacity:6,avail:1}] },
  { id:86, name:"Coron Bayview Heritage Hotel", location:"Coron Town", area:"Coron", stars:3, price:2700,
    images:["https://images.unsplash.com/photo-1526400473556-aac12354f3db?w=800&q=75","https://images.unsplash.com/photo-1496614932623-0a3a9743552e?w=600&q=70","https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70"],
    amenities:["Heritage Charm","Bay Views","Restaurant","WiFi","Cultural Tours","Rooftop"],
    rooms:[{type:"Classic Room",desc:"Heritage-style, AC, double bed",rate:1900,capacity:2,avail:8},{type:"Deluxe Bay View",desc:"Bay view, AC, queen bed",rate:2700,capacity:3,avail:5},{type:"Heritage Suite",desc:"Suite, antique decor, bay panorama",rate:4500,capacity:4,avail:2},{type:"Family Heritage",desc:"2 rooms, heritage decor, bay view",rate:7000,capacity:6,avail:1}] },
  { id:87, name:"Palawan Waterfall Lodge Narra", location:"Narra, Palawan", area:"Other Palawan", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=75","https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=600&q=70","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=600&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&q=70"],
    amenities:["Waterfall Access","River Kayak","Restaurant","Nature Walks","WiFi","Eco-Friendly"],
    rooms:[{type:"Nipa Hut",desc:"Traditional hut, fan, twin bed",rate:1800,capacity:2,avail:5},{type:"Deluxe Room",desc:"AC room, river view, queen",rate:2800,capacity:3,avail:4},{type:"Cottage",desc:"Private cottage, waterfall view, AC",rate:4500,capacity:4,avail:2},{type:"Family Cottage",desc:"2 rooms, waterfall views, AC",rate:7500,capacity:6,avail:1}] },
  { id:88, name:"El Nido Sands Inn", location:"El Nido Town", area:"El Nido", stars:2, price:1500,
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=800&q=75","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["WiFi","Tour Desk","Breakfast Incl.","Luggage Storage","Common Area"],
    rooms:[{type:"Budget Single",desc:"Economy room, fan, single bed",rate:900,capacity:1,avail:10},{type:"Standard Double",desc:"Fan, double bed, shared bath",rate:1200,capacity:2,avail:8},{type:"Deluxe Room",desc:"AC, queen bed, ensuite bath",rate:1500,capacity:2,avail:5},{type:"Family Room",desc:"AC, 3 beds, ensuite, window",rate:2500,capacity:5,avail:2}] },
  { id:89, name:"Coron Eco Lodge Busuanga", location:"Busuanga, Coron", area:"Coron", stars:3, price:2800,
    images:["https://images.unsplash.com/photo-1490718720478-364a07a997cd?w=800&q=75","https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=600&q=70","https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=600&q=70","https://images.unsplash.com/photo-1462953491269-9aff00919695?w=600&q=70"],
    amenities:["Wildlife","Birding","Eco Tours","Restaurant","WiFi","Motorboat"],
    rooms:[{type:"Eco Room",desc:"Solar-powered, fan, twin bed",rate:1800,capacity:2,avail:6},{type:"Deluxe Eco",desc:"AC eco room, garden view",rate:2800,capacity:3,avail:4},{type:"Eco Cottage",desc:"Private bamboo cottage, fan, queen",rate:4000,capacity:4,avail:2},{type:"Family Eco",desc:"2 rooms, solar AC, nature view",rate:7000,capacity:6,avail:1}] },
  { id:90, name:"Binaluan Cove Lodge", location:"Binaluan, Coron", area:"Coron", stars:3, price:3000,
    images:["https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70"],
    amenities:["Cove Views","Snorkeling","Beach","Restaurant","WiFi","Kayak"],
    rooms:[{type:"Garden Room",desc:"Garden-view, fan, twin beds",rate:1800,capacity:2,avail:6},{type:"Cove View Room",desc:"AC, cove view, queen bed",rate:3000,capacity:3,avail:4},{type:"Beachfront Room",desc:"Direct cove access, AC, king",rate:4500,capacity:3,avail:2},{type:"Family Cottage",desc:"2 rooms, cove view, porch, AC",rate:7500,capacity:6,avail:1}] },
  { id:91, name:"Maquinit Hot Spring Lodge", location:"Coron", area:"Coron", stars:2, price:1500,
    images:["https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&q=75","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=600&q=70","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&q=70"],
    amenities:["Hot Spring Access","Restaurant","Garden","WiFi","Transfer"],
    rooms:[{type:"Standard Room",desc:"Simple room, AC, double bed",rate:1000,capacity:2,avail:8},{type:"Deluxe Room",desc:"Larger, AC, queen, hot spring view",rate:1500,capacity:3,avail:5},{type:"Family Room",desc:"3 beds, AC, garden view",rate:2800,capacity:5,avail:2},{type:"Cottage",desc:"Private cottage, AC, garden",rate:3500,capacity:4,avail:1}] },
  { id:92, name:"Puerto Princesa Bay View Inn", location:"Puerto Princesa", area:"Puerto Princesa", stars:3, price:2500,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=600&q=70"],
    amenities:["Bay Views","Pool","Restaurant","WiFi","Airport Transfer","Tour Desk"],
    rooms:[{type:"Standard Room",desc:"City view, AC, queen bed",rate:1800,capacity:2,avail:10},{type:"Deluxe Bay View",desc:"Bay view, AC, king bed",rate:2500,capacity:3,avail:6},{type:"Suite",desc:"Living area, bay panorama, AC",rate:4500,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, bay view, AC, kitchenette",rate:6000,capacity:6,avail:1}] },
  { id:93, name:"Honda Bay Island Hopping Resort", location:"Honda Bay, Puerto Princesa", area:"Puerto Princesa", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=75","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Honda Bay Access","Boat Tours","Restaurant","Snorkeling","WiFi","Beach"],
    rooms:[{type:"Standard Room",desc:"Bay view, AC, double bed",rate:2200,capacity:2,avail:8},{type:"Deluxe Bay View",desc:"Full Honda Bay view, AC, king",rate:3200,capacity:3,avail:5},{type:"Suite",desc:"Living area, panoramic bay, balcony",rate:5500,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, bay view, AC, kitchenette",rate:7500,capacity:6,avail:1}] },
  { id:94, name:"Coron Island Hopping Basecamp", location:"Coron Town", area:"Coron", stars:2, price:1800,
    images:["https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=800&q=75","https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=600&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&q=70"],
    amenities:["Island Tours","Boat Packages","WiFi","Restaurant","Dive Packages"],
    rooms:[{type:"Budget Room",desc:"Economy room, fan, double",rate:1000,capacity:2,avail:10},{type:"Standard Room",desc:"AC room, queen bed, view",rate:1800,capacity:2,avail:8},{type:"Deluxe Room",desc:"AC, bay view, queen",rate:2500,capacity:3,avail:4},{type:"Family Room",desc:"3 beds, AC, view",rate:4200,capacity:5,avail:2}] },
  { id:95, name:"El Nido Coral Bay Inn", location:"El Nido Town", area:"El Nido", stars:3, price:2900,
    images:["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&q=75","https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=600&q=70","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70"],
    amenities:["Coral Views","Restaurant","Bar","WiFi","Tour Desk","Rooftop"],
    rooms:[{type:"Standard Room",desc:"Garden view, AC, double bed",rate:2000,capacity:2,avail:7},{type:"Deluxe Bay View",desc:"Bay view, AC, queen bed",rate:2900,capacity:3,avail:5},{type:"Suite",desc:"Large suite, panoramic bay view",rate:5200,capacity:4,avail:2},{type:"Family Suite",desc:"2 rooms, bay view, kitchenette",rate:8000,capacity:6,avail:1}] },
  { id:96, name:"Roxas Palawan Beach Lodge", location:"Roxas, Palawan", area:"Other Palawan", stars:2, price:1500,
    images:["https://images.unsplash.com/photo-1538965660664-25a57e5dd85f?w=800&q=75","https://images.unsplash.com/photo-1507523048282-815a7f548679?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=600&q=70"],
    amenities:["Beach Access","Restaurant","WiFi","Simple Accommodation","Off-The-Beaten-Path"],
    rooms:[{type:"Fan Room",desc:"Simple fan room, twin or double",rate:900,capacity:2,avail:8},{type:"AC Room",desc:"AC room, queen bed, ensuite",rate:1500,capacity:2,avail:5},{type:"Family Room",desc:"3 beds, AC, garden view",rate:2800,capacity:5,avail:2},{type:"Cottage",desc:"Private cottage, garden, fan",rate:2200,capacity:4,avail:2}] },
  { id:97, name:"Coron Landmark Hotel", location:"Coron Town", area:"Coron", stars:3, price:2200,
    images:["https://images.unsplash.com/photo-1507523048282-815a7f548679?w=800&q=75","https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=70","https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=70","https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&q=70"],
    amenities:["Central Location","Restaurant","WiFi","Airport Shuttle","Tour Desk","Bar"],
    rooms:[{type:"Standard",desc:"City view, AC, double bed",rate:1500,capacity:2,avail:10},{type:"Deluxe",desc:"Bay view, AC, queen bed",rate:2200,capacity:3,avail:7},{type:"Suite",desc:"Panoramic suite, AC, living area",rate:3800,capacity:4,avail:2},{type:"Family Suite",desc:"2 bedrooms, AC, bay view",rate:6000,capacity:6,avail:1}] },
  { id:98, name:"Palawan Eco Sunrise Resort", location:"Narra, Palawan", area:"Other Palawan", stars:3, price:2200,
    images:["https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=75","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70","https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=70"],
    amenities:["Eco-Lodge","Nature Walks","Kayaking","Restaurant","WiFi","Birdwatching"],
    rooms:[{type:"Eco Hut",desc:"Bamboo eco hut, fan, twin bed",rate:1400,capacity:2,avail:6},{type:"Deluxe Room",desc:"AC room, garden view, queen",rate:2200,capacity:3,avail:4},{type:"Suite",desc:"AC suite, river view, balcony",rate:3500,capacity:4,avail:2},{type:"Family Hut",desc:"Large eco hut, 3 beds, fan",rate:5000,capacity:6,avail:1}] },
  { id:99, name:"Archipelago Dive Resort El Nido", location:"El Nido Town", area:"El Nido", stars:3, price:3200,
    images:["https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=75","https://images.unsplash.com/photo-1484621765648-0161a1c7d7c6?w=600&q=70","https://images.unsplash.com/photo-1481886756534-97af88ccb438?w=600&q=70","https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=70"],
    amenities:["PADI Dive","Beach","Restaurant","Dive Shop","WiFi","Equipment Rental"],
    rooms:[{type:"Diver's Room",desc:"Fan room, equipment storage, twin",rate:2000,capacity:2,avail:6},{type:"Deluxe Dive Room",desc:"AC, sea view, dive storage locker",rate:3200,capacity:3,avail:4},{type:"Diver's Suite",desc:"Suite plus lounge, sea view, AC",rate:5000,capacity:4,avail:2},{type:"Family Room",desc:"3 beds, dive storage, AC, porch",rate:7000,capacity:6,avail:1}] },
  { id:100, name:"El Nido Mahogany Treehouse Resort", location:"Lio, El Nido", area:"El Nido", stars:4, price:9500,
    images:["https://images.unsplash.com/photo-1432408809004-bda82c5f8fa3?w=800&q=75","https://images.unsplash.com/photo-1476673160081-cf065607f449?w=600&q=70","https://images.unsplash.com/photo-1437477343932-9fa4693df8b1?w=600&q=70","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=70"],
    amenities:["Treehouse Villas","Pool","Jungle","Spa","Restaurant","Unique Stay"],
    rooms:[{type:"Standard Treehouse",desc:"Single treehouse, fan, twin bed",rate:7000,capacity:2,avail:4},{type:"Deluxe Treehouse",desc:"Larger treehouse, AC, queen bed, balcony",rate:9500,capacity:3,avail:3},{type:"Treehouse Suite",desc:"2-level treehouse, AC, sea view, deck",rate:15000,capacity:4,avail:2},{type:"Family Treehouse Cluster",desc:"3 connected treehouses, AC, sleeps 6",rate:25000,capacity:6,avail:1}] },
];
const TRANSPORTS = [
  { icon:"🛺", type:"Tricycle", sub:"Most common local transport in Palawan", fares:[{route:"Short Trip (within town)",price:"₱10–₱50",duration:"5-15 min"},{route:"Airport → Puerto Princesa City",price:"₱150–₱200",duration:"20-30 min"},{route:"El Nido Town (within barangay)",price:"₱20–₱60",duration:"5-20 min"},{route:"Coron Town (special hire)",price:"₱100–₱200",duration:"15-30 min"}] },
  { icon:"🚐", type:"Multicab", sub:"Shared mini-truck for short routes", fares:[{route:"Puerto Princesa City Routes",price:"₱12–₱25",duration:"10-30 min"},{route:"El Nido Town Proper Routes",price:"₱15–₱30",duration:"10-25 min"},{route:"Coron Town Local Routes",price:"₱15–₱25",duration:"10-20 min"},{route:"San Vicente Town Routes",price:"₱12–₱20",duration:"10-20 min"}] },
  { icon:"🚌", type:"Shuttle Van", sub:"Inter-city shared van transport", fares:[{route:"Puerto Princesa → El Nido",price:"₱600–₱800",duration:"5-6 hours"},{route:"Puerto Princesa → Port Barton",price:"₱350–₱450",duration:"3-4 hours"},{route:"Puerto Princesa → Sabang",price:"₱150–₱250",duration:"2 hours"},{route:"El Nido → Port Barton",price:"₱350–₱500",duration:"3 hours"}] },
  { icon:"🚍", type:"Bus", sub:"Provincial bus lines across Palawan", fares:[{route:"Puerto Princesa → Narra",price:"₱120–₱180",duration:"2-3 hours"},{route:"Puerto Princesa → Quezon",price:"₱200–₱280",duration:"4-5 hours"},{route:"Puerto Princesa → Roxas",price:"₱250–₱350",duration:"5-6 hours"},{route:"Puerto Princesa → Brooke's Point",price:"₱180–₱250",duration:"3-4 hours"}] },
  { icon:"🚗", type:"Car Rental", sub:"Self-drive or with driver", fares:[{route:"Sedan / SUV (Puerto Princesa / day)",price:"₱1,800–₱3,500",duration:"Per day"},{route:"With Driver (Puerto Princesa / day)",price:"₱2,500–₱4,500",duration:"Per day"},{route:"Van / Multi-cab Charter",price:"₱3,500–₱6,000",duration:"Per day"},{route:"Airport Pick-up / Drop-off",price:"₱500–₱800",duration:"Per trip"}] },
];

const AIRLINES = [
  { logo:"✈️", name:"Philippine Airlines", code:"PR", color:"#1e40af" },
  { logo:"🛫", name:"Cebu Pacific", code:"5J", color:"#dc2626" },
  { logo:"🌏", name:"AirAsia Philippines", code:"Z2", color:"#ef4444" },
  { logo:"✈️", name:"SkyJet Airlines", code:"M8", color:"#0e7490" },
  { logo:"🛩️", name:"AirSWIFT", code:"T6", color:"#7c3aed" },
];

const SAMPLE_REVIEWS = [
  { name:"Maria Santos", destination:"El Nido Island Hopping", rating:5, text:"Absolutely breathtaking! The lagoons are unlike anything I've ever seen. Our guide Kuya Edwin was amazing.", category:"Tourism" },
  { name:"James Chen", destination:"Puerto Princesa Underground River", rating:5, text:"One of the most incredible natural wonders I've ever visited. Book well in advance — it sells out fast!", category:"Tourism" },
  { name:"Sarah Williams", destination:"Discovery Coron Bay Resort", rating:4, text:"Stunning views from every room. The sunset from the infinity pool was extraordinary.", category:"Hotel" },
  { name:"Pedro Dela Cruz", destination:"Kayangan Lake Coron", rating:5, text:"The clearest water I have ever seen in my life. Worth every peso of the entrance fee!", category:"Tourism" },
  { name:"Yuki Tanaka", destination:"AirSWIFT El Nido Flight", rating:4, text:"Small turboprop plane but the views of Palawan from the air are spectacular!", category:"Flight" },
];

// ──────────────────────────────────────────
//  STATE
// ──────────────────────────────────────────
let currentCategory = 'All';
let currentSearch = '';
let destPage = 0;
const DEST_PER_PAGE = 12;
let filteredDests = [...DESTINATIONS];
let selectedStars = 0;
let userReviews = [...SAMPLE_REVIEWS];
let currentSlide = 0;
let totalSlides = 0;

// ──────────────────────────────────────────
//  NAVIGATION
// ──────────────────────────────────────────
function switchTab(tab) {
  // hide all sections
  document.querySelectorAll('.tab-section').forEach(s => s.style.display = 'none');
  document.getElementById('home-section').style.display = 'none';

  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');

  if (tab === 'home') {
    document.getElementById('home-section').style.display = 'flex';
  } else {
    const el = document.getElementById(`${tab}-section`);
    if (el) el.style.display = 'block';
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    switchTab(link.dataset.tab);
  });
});

document.querySelector('.btn-nav-cta')?.addEventListener('click', () => switchTab('tourism'));

// Navbar scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

// ──────────────────────────────────────────
//  MOBILE MENU
// ──────────────────────────────────────────
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  const isOpen = menu.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function mobileNav(tab) {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  menu.classList.remove('open');
  btn.classList.remove('open');
  document.body.style.overflow = '';
  // Update mobile active state
  document.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.toggle('active', l.dataset.tab === tab));
  switchTab(tab);
}

// Close mobile menu on outside click
document.addEventListener('click', e => {
  const menu = document.getElementById('mobile-menu');
  const btn = document.getElementById('hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove('open');
    btn.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ──────────────────────────────────────────
//  DESTINATIONS
// ──────────────────────────────────────────
function renderDestinations(reset = false) {
  const grid = document.getElementById('destinations-grid');
  if (reset) { grid.innerHTML = ''; destPage = 0; }

  const start = destPage * DEST_PER_PAGE;
  const slice = filteredDests.slice(start, start + DEST_PER_PAGE);

  slice.forEach((d, i) => {
    const card = document.createElement('div');
    card.className = 'dest-card';
    card.innerHTML = `
      <div class="dest-card-img-wrap">
        <img class="dest-card-img" src="${d.images[0]}" alt="${d.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70'"/>
        <span class="dest-card-badge">${d.difficulty}</span>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-category">${d.category}</div>
        <div class="dest-card-name">${d.name}</div>
        <div class="dest-card-desc">${d.desc.substring(0,90)}…</div>
        <div class="dest-card-footer">
          <div class="dest-card-rating">
            <span class="dest-stars">${'★'.repeat(Math.floor(d.rating))}${d.rating % 1 ? '½' : ''}</span>
            <span class="dest-rating-num">${d.rating}</span>
          </div>
          <button class="dest-card-btn" onclick="openDestModal(${d.id})">View Details</button>
        </div>
      </div>`;
    card.style.animationDelay = `${i * 0.04}s`;
    card.style.opacity = '0';
    card.style.animation = `fadeUp 0.5s ${i * 0.04}s forwards`;
    grid.appendChild(card);
  });

  destPage++;
  const btn = document.getElementById('load-more-btn');
  btn.style.display = destPage * DEST_PER_PAGE >= filteredDests.length ? 'none' : 'inline-block';
}

function loadMoreDestinations() {
  renderDestinations(false);
}

function filterByCategory(cat) {
  currentCategory = cat;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  applyFilters();
}

function filterDestinations() {
  currentSearch = document.getElementById('tourism-search').value.toLowerCase();
  applyFilters();
}

document.getElementById('tourism-search')?.addEventListener('keyup', e => {
  if (e.key === 'Enter') filterDestinations();
  else { currentSearch = e.target.value.toLowerCase(); applyFilters(); }
});

function applyFilters() {
  filteredDests = DESTINATIONS.filter(d => {
    const matchCat = currentCategory === 'All' || d.category === currentCategory;
    const matchSearch = !currentSearch || d.name.toLowerCase().includes(currentSearch) || d.location.toLowerCase().includes(currentSearch) || d.category.toLowerCase().includes(currentSearch) || d.desc.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });
  renderDestinations(true);
}

// ──────────────────────────────────────────
//  IMAGE SLIDER
// ──────────────────────────────────────────
function updateSlider() {
  const track = document.getElementById('slider-track');
  if (!track) return;
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

function slideModal(dir) {
  if (totalSlides === 0) return;
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function openDestModal(id) {
  const d = DESTINATIONS.find(x => x.id === id);
  if (!d) return;
  const modal = document.getElementById('dest-modal');

  // Build slider dots
  const dots = d.images.map((_, i) =>
    `<button class="slider-dot${i === 0 ? ' active' : ''}" onclick="goToSlide(${i})" aria-label="Image ${i+1}"></button>`
  ).join('');

  // Build slider images
  const imgs = d.images.map(img =>
    `<img src="${img}" alt="${d.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70'">`
  ).join('');

  document.getElementById('dest-modal-content').innerHTML = `
    <button class="modal-close" onclick="closeModal('dest-modal')">✕</button>
    <div class="modal-img-slider" id="modal-slider">
      <div class="slider-track" id="slider-track">${imgs}</div>
      <button class="slider-btn prev" onclick="slideModal(-1)" aria-label="Previous image">&#8249;</button>
      <button class="slider-btn next" onclick="slideModal(1)" aria-label="Next image">&#8250;</button>
      <div class="slider-dots" id="slider-dots">${dots}</div>
    </div>
    <div class="modal-body">
      <div class="modal-category">${d.category} · ${d.location}</div>
      <div class="modal-title">${d.name}</div>
      <div class="modal-desc">${d.desc}</div>
      <div class="modal-details">
        <div class="detail-item"><div class="detail-label">Entry Fee</div><div class="detail-value">${d.entry}</div></div>
        <div class="detail-item"><div class="detail-label">Best Time to Visit</div><div class="detail-value">${d.best}</div></div>
        <div class="detail-item"><div class="detail-label">Duration</div><div class="detail-value">${d.duration}</div></div>
        <div class="detail-item"><div class="detail-label">Difficulty</div><div class="detail-value">${d.difficulty}</div></div>
        <div class="detail-item"><div class="detail-label">Rating</div><div class="detail-value">${'★'.repeat(Math.floor(d.rating))} ${d.rating}/5</div></div>
        <div class="detail-item"><div class="detail-label">Category</div><div class="detail-value">${d.category}</div></div>
      </div>
      <div class="modal-actions">
        <button class="btn-book" onclick="closeModal('dest-modal'); switchTab('hotels')">Find Nearby Hotels</button>
        <button class="btn-book" style="background:var(--gold);color:var(--dark);" onclick="closeModal('dest-modal'); switchTab('flights')">Book Flights</button>
      </div>
    </div>`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  currentSlide = 0;
  totalSlides = d.images.length;
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  document.body.style.overflow = '';
}

document.getElementById('dest-modal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal('dest-modal');
});
document.getElementById('room-modal')?.addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal('room-modal');
});

// ──────────────────────────────────────────
//  HOTELS
// ──────────────────────────────────────────
// State
let hotelFilterArea = 'All';
let hotelFilterStars = 'All';
let hotelSearchQuery = '';
let hotelPage = 0;
const HOTELS_PER_PAGE = 12;
let hotelImgIndex = {};

function renderHotelSection() {
  renderHotelFilters();
  renderHotelCards();
}

function renderHotelFilters() {
  // area filter chips already in HTML; handled via filterHotelsByArea()
}

function getFilteredHotels() {
  return HOTELS.filter(h => {
    const matchArea = hotelFilterArea === 'All' || h.area === hotelFilterArea;
    const matchStars = hotelFilterStars === 'All' || h.stars === parseInt(hotelFilterStars);
    const q = hotelSearchQuery.toLowerCase();
    const matchSearch = !q || h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.amenities.some(a => a.toLowerCase().includes(q));
    return matchArea && matchStars && matchSearch;
  });
}

function renderHotelCards() {
  const grid = document.getElementById('hotel-cards-grid');
  const filtered = getFilteredHotels();
  const slice = filtered.slice(0, (hotelPage + 1) * HOTELS_PER_PAGE);

  grid.innerHTML = '';
  if (!slice.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-light);padding:40px;">No hotels found.</p>';
    document.getElementById('hotel-load-more').style.display = 'none';
    return;
  }

  slice.forEach(h => {
    const imgIdx = hotelImgIndex[h.id] || 0;
    const card = document.createElement('div');
    card.className = 'hotel-card';
    card.innerHTML = `
      <div class="hotel-card-img-wrap" onclick="openHotelModal(${h.id})">
        <img class="hotel-card-img" src="${h.images[imgIdx]}" alt="${h.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70'"/>
        <div class="hotel-img-dots">
          ${h.images.map((_, i) => `<span class="hotel-dot ${i===imgIdx?'active':''}" onclick="event.stopPropagation();cycleHotelImg(${h.id},${i})"></span>`).join('')}
        </div>
        <div class="hotel-card-badge">${'★'.repeat(h.stars)}</div>
      </div>
      <div class="hotel-card-body" onclick="openHotelModal(${h.id})" style="cursor:pointer;">
        <div class="hotel-card-name">${h.name}</div>
        <div class="hotel-card-location">📍 ${h.location}</div>
        <div class="hotel-card-amenities">${h.amenities.slice(0,3).map(a => `<span class="amenity-tag">${a}</span>`).join('')}</div>
        <div class="hotel-card-footer">
          <div class="hotel-price">₱${h.price.toLocaleString()} <span>/ night from</span></div>
          <button class="dest-card-btn" onclick="event.stopPropagation();openHotelModal(${h.id})">Book Now</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });

  const loadBtn = document.getElementById('hotel-load-more');
  loadBtn.style.display = slice.length < filtered.length ? 'block' : 'none';
}

function cycleHotelImg(hotelId, idx) {
  hotelImgIndex[hotelId] = idx;
  // Re-render just that card efficiently
  renderHotelCards();
}

function filterHotelsByArea(area, el) {
  hotelFilterArea = area;
  hotelPage = 0;
  document.querySelectorAll('#hotel-area-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderHotelCards();
}

function filterHotelsByStars(stars, el) {
  hotelFilterStars = stars;
  hotelPage = 0;
  document.querySelectorAll('#hotel-star-chips .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderHotelCards();
}

function searchHotels() {
  hotelSearchQuery = document.getElementById('hotel-search').value;
  hotelPage = 0;
  renderHotelCards();
}

function loadMoreHotels() {
  hotelPage++;
  renderHotelCards();
}

// ── Hotel Modal (click hotel → set dates → book) ──────────────────────────
function openHotelModal(hotelId) {
  const hotel = HOTELS.find(h => h.id === hotelId);
  if (!hotel) return;

  // Default dates: tomorrow → day after tomorrow
  const d1 = new Date(); d1.setDate(d1.getDate() + 1);
  const d2 = new Date(); d2.setDate(d2.getDate() + 2);
  const fmt = d => d.toISOString().split('T')[0];

  const modal = document.getElementById('room-modal');
  modal.dataset.hotelId = hotelId;

  renderHotelModalContent(hotel, fmt(d1), fmt(d2), 2, null);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function renderHotelModalContent(hotel, checkin, checkout, guests, selectedRoom) {
  const ci = new Date(checkin), co = new Date(checkout);
  const nights = Math.max(1, Math.ceil((co - ci) / 86400000));

  // Filter rooms by guest capacity
  const eligibleRooms = hotel.rooms.filter(r => r.capacity >= guests);

  const content = document.getElementById('room-modal-content');
  content.innerHTML = `
    <button class="modal-close" onclick="closeModal('room-modal')">✕</button>
    <div class="hotel-modal-layout">
      <!-- Left: gallery -->
      <div class="hotel-modal-gallery">
        <img class="hotel-modal-main-img" id="modal-main-img" src="${hotel.images[0]}" alt="${hotel.name}" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=70'"/>
        <div class="hotel-modal-thumbs">
          ${hotel.images.map((img, i) => `<img src="${img}" class="hotel-modal-thumb ${i===0?'active':''}" onclick="switchModalImg(this,'${img}')" onerror="this.style.display='none'" />`).join('')}
        </div>
        <div class="hotel-modal-info">
          <div class="hotel-modal-stars">${'★'.repeat(hotel.stars)}<span class="hotel-modal-area">${hotel.area}</span></div>
          <h2 class="hotel-modal-title">${hotel.name}</h2>
          <div class="hotel-modal-loc">📍 ${hotel.location}</div>
          <div class="hotel-modal-amenities">${hotel.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('')}</div>
        </div>
      </div>

      <!-- Right: booking panel -->
      <div class="hotel-booking-panel">
        <h3 class="booking-panel-title">Book Your Stay</h3>

        <!-- Date & guest inputs -->
        <div class="booking-fields">
          <div class="booking-field">
            <label>Check-in</label>
            <input type="date" id="modal-checkin" value="${checkin}" onchange="refreshModalRooms(${hotel.id})"/>
          </div>
          <div class="booking-field">
            <label>Check-out</label>
            <input type="date" id="modal-checkout" value="${checkout}" onchange="refreshModalRooms(${hotel.id})"/>
          </div>
          <div class="booking-field">
            <label>Guests</label>
            <select id="modal-guests" onchange="refreshModalRooms(${hotel.id})">
              ${[1,2,3,4,5,6].map(n => `<option value="${n}" ${n===guests?'selected':''}>${n} Guest${n>1?'s':''}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="nights-badge">${nights} Night${nights!==1?'s':''}</div>

        <!-- Room list -->
        <div class="rooms-scroll">
          ${eligibleRooms.length === 0
            ? `<p style="color:var(--text-light);text-align:center;padding:20px;">No rooms available for ${guests} guests.<br>Try reducing guest count.</p>`
            : eligibleRooms.map(r => {
                const avail = r.avail > 0;
                const total = r.rate * nights;
                const isSel = selectedRoom === r.type;
                return `
                <div class="room-row-new ${isSel?'selected':''} ${!avail?'unavail':''}" onclick="${avail?`selectRoom(${hotel.id},'${r.type.replace(/'/g,"\'")}',${r.rate},${nights},${guests})`:''}">
                  <div class="room-row-left">
                    <div class="room-type-name">${r.type}</div>
                    <div class="room-type-desc">${r.desc}</div>
                    <div class="room-capacity-badge">👥 Max ${r.capacity} guest${r.capacity>1?'s':''}</div>
                  </div>
                  <div class="room-row-right">
                    <div class="room-nightly">₱${r.rate.toLocaleString()}<span>/night</span></div>
                    <div class="room-total">₱${total.toLocaleString()} total</div>
                    <div class="room-avail-tag ${avail?'avail':'sold'}">${avail?`${r.avail} left`:'Sold Out'}</div>
                  </div>
                </div>`;
              }).join('')
          }
        </div>

        ${selectedRoom ? `
          <div class="booking-summary">
            <div class="summary-row"><span>Room</span><strong>${selectedRoom}</strong></div>
            <div class="summary-row"><span>Guests</span><strong>${guests}</strong></div>
            <div class="summary-row"><span>Nights</span><strong>${nights}</strong></div>
            <div class="summary-row total"><span>Total</span><strong>₱${(eligibleRooms.find(r=>r.type===selectedRoom)?.rate*nights||0).toLocaleString()}</strong></div>
            <button class="btn-primary full-width" onclick="confirmBooking(${hotel.id},'${selectedRoom.replace(/'/g,"\'")}',${eligibleRooms.find(r=>r.type===selectedRoom)?.rate||0},${nights})">Confirm Booking</button>
          </div>` : ''}
      </div>
    </div>`;
}

function switchModalImg(el, src) {
  document.getElementById('modal-main-img').src = src;
  document.querySelectorAll('.hotel-modal-thumb').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
}

function refreshModalRooms(hotelId) {
  const hotel = HOTELS.find(h => h.id === hotelId);
  if (!hotel) return;
  const checkin = document.getElementById('modal-checkin').value;
  const checkout = document.getElementById('modal-checkout').value;
  const guests = parseInt(document.getElementById('modal-guests').value);
  renderHotelModalContent(hotel, checkin, checkout, guests, null);
}

function selectRoom(hotelId, roomType, rate, nights, guests) {
  const hotel = HOTELS.find(h => h.id === hotelId);
  if (!hotel) return;
  const checkin = document.getElementById('modal-checkin').value;
  const checkout = document.getElementById('modal-checkout').value;
  renderHotelModalContent(hotel, checkin, checkout, guests, roomType);
}

function confirmBooking(hotelId, roomType, rate, nights) {
  const hotel = HOTELS.find(h => h.id === hotelId);
  const ref = 'TE' + Math.random().toString(36).substring(2,8).toUpperCase();
  const checkin = document.getElementById('modal-checkin')?.value || '—';
  const checkout = document.getElementById('modal-checkout')?.value || '—';
  const guests = document.getElementById('modal-guests')?.value || '—';

  document.getElementById('room-modal-content').innerHTML = `
    <button class="modal-close" onclick="closeModal('room-modal')">✕</button>
    <div class="booking-confirm">
      <div class="confirm-icon">🎉</div>
      <h3>Booking Confirmed!</h3>
      <p>Your stay at <strong>${hotel.name}</strong> has been reserved.</p>
      <div class="booking-ref">
        <div style="font-size:12px;color:var(--text-light);margin-bottom:4px;text-transform:uppercase;letter-spacing:1px;">Booking Reference</div>
        <strong>${ref}</strong>
      </div>
      <div class="confirm-details">
        <div class="confirm-row"><span>Room</span><strong>${roomType}</strong></div>
        <div class="confirm-row"><span>Check-in</span><strong>${checkin}</strong></div>
        <div class="confirm-row"><span>Check-out</span><strong>${checkout}</strong></div>
        <div class="confirm-row"><span>Guests</span><strong>${guests}</strong></div>
        <div class="confirm-row total"><span>Total</span><strong>₱${(rate*nights).toLocaleString()}</strong></div>
      </div>
      <p style="font-size:13px;color:var(--text-light);margin-top:12px;">Confirmation sent to your email. This is a simulated booking.</p>
      <button class="btn-primary" onclick="closeModal('room-modal')" style="margin-top:20px;">Done</button>
    </div>`;
}

// legacy alias kept so any existing onclick still works
function openRoomModal(id) { openHotelModal(id); }
function bookRoom(hotelId, roomType, rate, nights) { openHotelModal(hotelId); }
function searchHotelAvailability() {}

//  FLIGHTS
// ──────────────────────────────────────────
function setTripType(type) {
  document.getElementById('one-way-btn').classList.toggle('active', type === 'one-way');
  document.getElementById('round-trip-btn').classList.toggle('active', type === 'round-trip');
  document.getElementById('return-field').style.display = type === 'round-trip' ? 'flex' : 'none';
}

function swapAirports() {
  // Visual only for simulation
  const from = document.getElementById('flight-from');
  const to = document.getElementById('flight-to');
  const tempIdx = from.selectedIndex;
  // We can only meaningfully swap if they share options — just flash the button
  from.style.transition = 'opacity 0.2s';
  from.style.opacity = '0.3';
  setTimeout(() => { from.style.opacity = '1'; }, 200);
}

function searchFlights() {
  const from = document.getElementById('flight-from').value;
  const to = document.getElementById('flight-to').value;
  const depart = document.getElementById('flight-depart').value;
  const pax = parseInt(document.getElementById('flight-pax').value) || 1;
  if (!depart) { alert('Please select a departure date.'); return; }

  const container = document.getElementById('flight-cards');
  container.innerHTML = '';
  const flightData = generateFlights(from, to, depart, pax);
  flightData.forEach(f => {
    const card = document.createElement('div');
    card.className = 'flight-card';
    card.innerHTML = `
      <div style="min-width:100px">
        <div class="airline-logo">${f.logo}</div>
        <div class="flight-airline">${f.airline}</div>
        <div class="flight-number">Flight ${f.code}${f.num}</div>
        <span class="flight-class-badge">${f.class}</span>
      </div>
      <div class="flight-route">
        <div>
          <div class="flight-time">${f.depTime}</div>
          <div class="flight-city">${f.from.split('(')[1]?.replace(')','') || f.from}</div>
        </div>
        <div class="flight-duration-wrap">
          <div class="flight-duration">${f.duration}</div>
          <div class="flight-line"></div>
          <div class="flight-stops">${f.stops}</div>
        </div>
        <div>
          <div class="flight-time">${f.arrTime}</div>
          <div class="flight-city">${f.to.split('(')[1]?.replace(')','') || f.to}</div>
        </div>
      </div>
      <div style="text-align:right;min-width:140px">
        <div class="flight-price">₱${(f.price * pax).toLocaleString()}</div>
        <div class="flight-price-label">${pax} pax · ${f.class}</div>
        <button class="btn-select-flight" onclick="selectFlight('${f.airline}','${f.code}${f.num}',${f.price * pax})">Select</button>
      </div>`;
    container.appendChild(card);
  });
  document.getElementById('flight-results').style.display = 'block';
}

function generateFlights(from, to, date, pax) {
  const flights = [];
  const basePrices = { "Puerto Princesa (PPS)": 2800, "El Nido (ENI)": 5500, "Busuanga/Coron (USU)": 4200 };
  const base = basePrices[to] || 3000;
  const times = [["05:30","06:50"],["07:15","08:35"],["09:00","10:20"],["11:30","12:50"],["14:00","15:20"],["16:45","18:05"],["18:30","19:50"]];
  const airlines = [...AIRLINES];
  const shuffle = arr => arr.sort(() => Math.random() - 0.5);
  shuffle(airlines).slice(0, 5).forEach((a, i) => {
    const t = times[i % times.length];
    flights.push({
      logo: a.logo, airline: a.name, code: a.code,
      num: Math.floor(100 + Math.random() * 900),
      from, to, depTime: t[0], arrTime: t[1],
      duration: "1h 20m", stops: "Direct",
      price: Math.round(base * (0.7 + Math.random() * 0.8)),
      class: ["Economy","Economy","Economy","Business","Premium Economy"][i % 5]
    });
  });
  return flights.sort((a,b) => a.price - b.price);
}

function selectFlight(airline, flightNum, total) {
  const ref = 'TF' + Math.random().toString(36).substring(2,8).toUpperCase();
  const popup = document.createElement('div');
  popup.style.cssText = 'position:fixed;inset:0;z-index:3000;background:rgba(13,31,45,.8);display:flex;align-items:center;justify-content:center;padding:20px;';
  popup.innerHTML = `
    <div style="background:white;border-radius:20px;padding:36px;max-width:420px;width:100%;text-align:center;animation:modalIn .3s ease">
      <div style="font-size:52px;margin-bottom:12px">✈️</div>
      <h3 style="font-family:var(--font-display);font-size:24px;margin-bottom:8px;color:var(--dark)">Flight Selected!</h3>
      <p style="color:var(--text-light);font-size:14px;margin-bottom:16px">${airline} · Flight ${flightNum}</p>
      <div style="background:var(--teal-pale);border-radius:10px;padding:14px;margin-bottom:20px">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--text-light)">Booking Reference</div>
        <div style="font-family:var(--font-display);font-size:22px;color:var(--teal);letter-spacing:2px">${ref}</div>
      </div>
      <p style="color:var(--text);font-size:15px;margin-bottom:20px">Total: <strong>₱${total.toLocaleString()}</strong></p>
      <p style="color:var(--text-light);font-size:12px;margin-bottom:20px">Simulated booking for academic demonstration.</p>
      <button onclick="this.closest('[style]').remove()" style="background:var(--teal);color:white;border:none;border-radius:10px;padding:12px 32px;font-size:14px;font-weight:600;cursor:pointer">Done</button>
    </div>`;
  document.body.appendChild(popup);
}

// ──────────────────────────────────────────
//  TRANSPORT
// ──────────────────────────────────────────
function renderTransport() {
  const grid = document.getElementById('transport-grid');
  TRANSPORTS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'transport-card';
    card.innerHTML = `
      <div class="transport-icon">${t.icon}</div>
      <div class="transport-type">${t.type}</div>
      <div class="transport-sub">${t.sub}</div>
      <div class="transport-fares">
        ${t.fares.map(f => `
          <div class="fare-row">
            <div>
              <div class="fare-route">${f.route}</div>
              <div class="fare-duration">⏱ ${f.duration}</div>
            </div>
            <div class="fare-price">${f.price}</div>
          </div>`).join('')}
      </div>`;
    grid.appendChild(card);
  });
}

// ──────────────────────────────────────────
//  FEEDBACK
// ──────────────────────────────────────────
function initStarRating() {
  const stars = document.querySelectorAll('.star');
  stars.forEach(s => {
    s.addEventListener('mouseenter', () => {
      stars.forEach((st, i) => st.classList.toggle('active', i < parseInt(s.dataset.val)));
    });
    s.addEventListener('mouseleave', () => {
      stars.forEach((st, i) => st.classList.toggle('active', i < selectedStars));
    });
    s.addEventListener('click', () => {
      selectedStars = parseInt(s.dataset.val);
      stars.forEach((st, i) => st.classList.toggle('active', i < selectedStars));
    });
  });
}

function renderReviews() {
  const list = document.getElementById('reviews-list');
  list.innerHTML = '';
  userReviews.slice(-8).reverse().forEach(r => {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
      <div class="review-header">
        <div class="review-name">${r.name}</div>
        <div class="review-stars">${'★'.repeat(r.rating)}</div>
      </div>
      <div class="review-destination">📍 ${r.destination} · ${r.category}</div>
      <div class="review-text">"${r.text}"</div>`;
    list.appendChild(card);
  });
}

function submitFeedback() {
  const name = document.getElementById('fb-name').value.trim();
  const dest = document.getElementById('fb-destination').value.trim();
  const msg = document.getElementById('fb-message').value.trim();
  const cat = document.getElementById('fb-category').value;

  if (!name || !dest || !msg || !selectedStars) {
    alert('Please fill in all fields and select a rating.');
    return;
  }

  userReviews.push({ name, destination: dest, rating: selectedStars, text: msg, category: cat });
  renderReviews();

  document.getElementById('fb-name').value = '';
  document.getElementById('fb-destination').value = '';
  document.getElementById('fb-message').value = '';
  selectedStars = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));

  const success = document.getElementById('fb-success');
  success.style.display = 'block';
  setTimeout(() => success.style.display = 'none', 4000);
}

// ──────────────────────────────────────────
//  DATE DEFAULTS
// ──────────────────────────────────────────
function setDefaultDates() {
  const today = new Date();
  const fmt = d => d.toISOString().split('T')[0];
  const d1 = new Date(today); d1.setDate(today.getDate() + 7);
  const d2 = new Date(today); d2.setDate(today.getDate() + 10);
  document.getElementById('gds-checkin').value = fmt(d1);
  document.getElementById('gds-checkout').value = fmt(d2);
  document.getElementById('flight-depart').value = fmt(d1);
  document.getElementById('flight-return').value = fmt(d2);
}

// ──────────────────────────────────────────
//  INIT
// ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderDestinations(true);
  renderHotelCards();
  renderTransport();
  renderReviews();
  initStarRating();
  setDefaultDates();
});
