'use client';

import { auth, db } from '@/context/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const RatingBlog = ({ Id }: { Id: any }) => {
  const [rating, setRating] = useState(0);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false);
  const [totalRating, setTotalRating] = useState<any>();
  const [isPending, startTransition] = useTransition();
  const [overallRating, setOverallRating] = useState(0);

  const router = useRouter();

  const handleRatingSubmit = async () => {
    if (isRatingSubmitted) {
      return;
    }
    setIsRatingSubmitted(true);
    try {
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          const ratingsRef = collection(db, `/blogs/${Id}/ratings`);
          await addDoc(ratingsRef, {
            author: user.displayName || user.email,
            rating: rating,
            createdAt: serverTimestamp(),
          });

          setIsRatingSubmitted(false);
          fetchRatings();
          setRating(0);
          startTransition(() => {
            router.refresh();
          });
        }
      });
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };
  const fetchRatings = async () => {
    const ratingsRef = collection(db, `/blogs/${Id}/ratings`);
    const q = query(ratingsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const ratingsData = querySnapshot.docs.map((doc) => doc.data());
    setTotalRating(ratingsData.length);
    // Calculate overall rating
    const sumRating = ratingsData.reduce(
      (total, rating) => total + rating.rating,
      0
    );
    const averageRating =
      ratingsData.length > 0 ? sumRating / ratingsData.length : 0;
    setOverallRating(averageRating);
  };

  useEffect(() => {
    fetchRatings();
  }, [Id]);

  const starColors = Array.from({ length: 5 }, (_, index) =>
    index < rating ? '#ebbc0f' : '#e1e1e1'
  );

  return (
    <div className="flex gap-3 max-sm:flex-col items-center max-sm:items-start justify-between">
      <div className="flex items-center gap-2 max-sm:justify-between">
        <h2 className="font-semibold text-lg mb-0 max-sm:hidden">
          Overall Rating:
        </h2>
        <div className="flex items-center">
          <RatingStars rating={overallRating} />
          <p className="text-lg font-bold mb-0 ml-2">
            {overallRating.toFixed(1)} / 5
          </p>
        </div>
        <div className="flex items-center text-secondary">
          <h3 className="font-semibold mb-0">Total Rating :</h3>
          <p className="mb-0"> {totalRating}</p>
        </div>
      </div>
      {Cookies.get('userData') && (
        <div className="flex items-center gap-2">
          {starColors.map((color, index) => (
            <AiFillStar
              fontSize={'1.2rem'}
              key={index}
              style={{ color }}
              onMouseEnter={() => setRating(index + 1)}
            />
          ))}
          <button
            onClick={handleRatingSubmit}
            disabled={isRatingSubmitted}
            className="btn btn-sm"
          >
            Submit Rating
          </button>
        </div>
      )}
    </div>
  );
};

export default RatingBlog;

const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<AiFillStar key={i} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<AiOutlineStar key={fullStars} className="text-yellow-500" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <AiOutlineStar key={fullStars + 1 + i} className="text-yellow-500" />
      );
    }

    return stars;
  };

  return <>{renderStars()}</>;
};
