import Stripe from 'stripe';
import User from '../Models/UserModel.js';
import CourseModel from '../Models/CourseModel.js';
import ChapterModel from '../Models/ChapterModel.js';
import { createError } from '../Utils/CreateError.js';

export const UserUpdate = async (req, res, next) => {
    const { userId, chapterId } = req.body;
    try {
        const user = await User.findById(userId);

        if (user.ChapterCompleted.includes(chapterId)) {
            return res.status(400).json({ error: 'Chapter already completed.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: req.body, $push: { ChapterCompleted: chapterId } },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        next(createError(500, 'Update failed'));
    }
};


export const StripeCheckout = async (req, res, next) => {
    const { courseId, userId, coursedata } = req.body;
    const stripe = new Stripe(process.env.STRIP_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: coursedata.price * 100,
        currency: "inr",
        description: coursedata.description,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    if (paymentIntent.status === 'succeeded') {
        const userUpdate = await User.findByIdAndUpdate(userId, { $push: { coursesEnrolled: courseId } }, { new: true });
        const updateChapters = await ChapterModel.updateMany({ courseId: courseId }, { $set: { isFree: true } }, { new: true });
    }

    res.status(200).send({ clientSecret: paymentIntent.client_secret, })

};