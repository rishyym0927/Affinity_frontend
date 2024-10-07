import React, {useState,useEffect} from 'react'

const DarkModeToggle = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setTheme(savedTheme);
        } else {
          setTheme('dark'); 
          localStorage.setItem('theme', 'dark'); 
        }
      }, []);

    useEffect(() => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
    }, [theme]);
  
    const toggleTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    };
  
  return (
    <div>
        <div
        onClick={toggleTheme}
        className={`w-14 h-8 flex items-center bg-gray-300 dark:bg-gray-600 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-400'
        }`}
      >
        {/* Circle inside the switch */}
        <div
          className={` w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            theme === 'dark' ? 'translate-x-6 bg-[#ff0059da]' : 'translate-x-0 bg-white'
          }`}
        ></div>
      </div>
    </div>
  )
}

export default DarkModeToggle
