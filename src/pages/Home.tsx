import { Link } from 'react-router-dom'
import { Stethoscope, Pill, Book, Heart } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Traditional Ayurvedic Wisdom, Modern Healthcare Solutions
              </h1>
              <p className="text-lg mb-6">
                Discover personalized Ayurvedic treatments based on your symptoms with our advanced prediction system.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/symptom-checker" className="btn btn-primary">
                  Check Your Symptoms
                </Link>
                <a href="#learn-more" className="btn bg-white border border-primary text-primary hover:bg-primary/10">
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="/src/images/homeimg.jpg" 
                alt="Ayurvedic herbs and treatments"
                className="rounded-lg shadow-lg max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background-dark" id="learn-more">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Stethoscope className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze Symptoms</h3>
              <p>Input your symptoms along with their severity, duration, and frequency.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Book className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Predict Conditions</h3>
              <p>Our algorithm analyzes your symptoms to predict possible health conditions.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Pill className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suggest Treatments</h3>
              <p>Get personalized Ayurvedic treatment recommendations for your conditions.</p>
            </div>
            
            <div className="card flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Improve Wellness</h3>
              <p>Follow the personalized recommendations to improve your overall wellness.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-primary">Ready to Discover Your Ayurvedic Path?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Start your journey to better health with personalized Ayurvedic recommendations based on your unique symptoms.
          </p>
          <Link to="/symptom-checker" className="btn btn-primary">
            Check Your Symptoms Now
          </Link>
        </div>
      </section>
    </div>
  )
}
