import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AxiosRequest } from './AxiosRequest';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51ObHAQSFUNMmDRyleKnltPLDHXVOJpPyQVP63PnU8C2hDoPVAoxfBPF6WHkPAJ9ID6HW3mfJwKcQH13FPX9oYAIl008RYSyIWV")

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const location = useLocation()
  const data = location.state
  
  console.log(data)

  useEffect(() => {
    const makerequest = async () => {
      try {
        const res = await AxiosRequest.post('/user/stripecheckout', { courseId: data.courseId, userId: data.userId, coursedata: data.coursedata },)        
        setClientSecret(res.data.clientSecret)
      } catch (error) {
        console.log(error)
      }
    }
    makerequest()
  }, [])

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div clasname="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

export default Pay