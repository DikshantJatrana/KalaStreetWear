# KalaStreetWear 🛍️

KalaStreetWear is a modern e-commerce platform tailored for streetwear enthusiasts. It offers a seamless shopping experience, integrating robust backend functionality with an intuitive user interface. Built using React for the frontend and Supabase for backend services, KalaStreetWear demonstrates the fusion of cutting-edge technologies in building scalable and interactive web applications.

---

## 🚀 Features

### 1. **User-Friendly Interface**
   - Intuitive navigation for browsing and searching products.
   - Mobile-first design for seamless usability on all devices.

### 2. **Authentication and Authorization**
   - User sign-up, login, and secure session management via Supabase authentication.
   - Password recovery and email verification included.

### 3. **Product Management**
   - Dynamic product listings with images, descriptions, and pricing.
   - Categories and filtering for an enhanced browsing experience.

### 4. **Cart and Checkout**
   - Add to cart functionality with quantity updates.
   - A mock checkout process for testing purposes.

### 5. **Backend Integration**
   - Supabase for real-time database management and API handling.
   - Secure and scalable backend for data storage.

### 6. **Responsive Design**
   - Fully responsive and adaptive design using Tailwind CSS.

---

## 🛠️ Tech Stack

### **Frontend:**
- **React**: Component-based architecture for a dynamic user interface.
- **Tailwind CSS**: For rapid and responsive UI development.

### **Backend:**
- **Supabase**: Real-time database, authentication, and backend-as-a-service.

### **Tools and Libraries:**
- **React Router**: For navigation between pages.
- **Axios**: For API requests.
- **Daisy UI**: A Tailwind CSS-based component library for pre-built styles.
- **Zustand**: Lightweight state management for global app state.

---

## 📦 Installation and Setup

### Prerequisites:
- Node.js installed on your machine.
- Supabase project set up with the required database schema.

### Clone the Repository:
```bash
git clone https://github.com/DikshantJatrana/KalaStreetWear.git
cd KalaStreetWear
```

### Install Dependencies:
```bash
npm install
```

### Set Up Environment Variables:
Create a `.env` file in the root directory and add the following:
```env
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run the Development Server:
```bash
npm start
```

### Build for Production:
```bash
npm run build
```

---

## 🗂️ Folder Structure

```
KalaStreetWear/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Main application pages
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API service files
│   ├── store/            # Zustand state management
│   ├── App.js            # Main application component
│   ├── index.js          # Entry point of the app
│   └── ...
├── .env                  # Environment variables
├── package.json          # Dependencies and scripts
└── README.md             # Documentation
```

---

## 📖 How It Works

1. **Authentication**:
   - Users can create an account or log in using Supabase's authentication service.
   - Session tokens are securely managed.

2. **Product Display**:
   - Products are fetched from the Supabase database and displayed dynamically.

3. **Cart and Checkout**:
   - Users can add items to their cart, modify quantities, and simulate checkout.

4. **Backend API**:
   - The app communicates with the Supabase database via secure REST APIs.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check the [issues page](https://github.com/DikshantJatrana/KalaStreetWear/issues).

1. Fork the project.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## ✨ Acknowledgments

- [Supabase](https://supabase.io/) for their powerful backend services.
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful and responsive UI.
- [React](https://reactjs.org/) for the robust frontend framework.
- Open-source libraries and resources that made this project possible.

---

## 📬 Contact

For inquiries, suggestions, or feedback, feel free to reach out:  
**Dikshant Jatrana**  
GitHub: [@DikshantJatrana](https://github.com/DikshantJatrana)

---

### 🌟 Star the Repository
If you like this project, please consider starring the repo! ⭐
