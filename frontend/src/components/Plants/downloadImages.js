const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'monstera.jpg',
    url: 'https://images.unsplash.com/photo-1525498128493-380d1990a112?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Medium'
  },
  {
    name: 'snake-plant.jpg',
    url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Very Easy',
    light: 'Low'
  },
  {
    name: 'peace-lily.jpg',
    url: 'https://images.unsplash.com/photo-1598887141928-7c4b4270e447?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Medium'
  },
  {
    name: 'aloe-vera.jpg',
    url: 'https://images.unsplash.com/photo-1596547609652-9cf5d8c10d6e?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Easy',
    light: 'Bright'
  },
  {
    name: 'fiddle-leaf.jpg',
    url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Medium',
    light: 'Bright'
  },
  {
    name: 'lavender.jpg',
    url: 'https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=800&q=80',
    category: 'Outdoor',
    difficulty: 'Easy',
    light: 'Bright'
  },
  {
    name: 'succulents.jpg',
    url: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Very Easy',
    light: 'Bright'
  },
  {
    name: 'orchid.jpg',
    url: 'https://images.unsplash.com/photo-1566908829550-e6551b00979b?w=800&q=80',
    category: 'Indoor',
    difficulty: 'Hard',
    light: 'Medium'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filename);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      } else {
        reject(`Failed to download ${filename}: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      reject(`Error downloading ${filename}: ${err.message}`);
    });
  });
};

const downloadAllImages = async () => {
  const imagesDir = path.join(__dirname, '../../../public/images/plants');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  for (const image of images) {
    const filename = path.join(imagesDir, image.name);
    try {
      await downloadImage(image.url, filename);
    } catch (error) {
      console.error(error);
    }
  }
};

downloadAllImages().then(() => {
  console.log('All images downloaded successfully!');
}).catch((error) => {
  console.error('Error downloading images:', error);
}); 