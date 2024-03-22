# A-Coaching-Conundrum
Stepful - Product Engineer take-home 

# Flows:
- Coach adds timeslots of availability
- Coach views upcoming slots (phone number shown)
- Coach views previous slots (notes and scores)
- Student views all coaches 
- Student can view upcoming slots (phone number shown)
- Coach records satisfaction + notes
- choose the current user (show whether student or coach in dropdown)

# Installation Instructions
- docker-compose up --build 
- docker-compose exec be ./manage.py migrate
- Replace USER_AUTH with "Basic [user:password]" but base 32 encoded for easy swtiching

# Trade-offs
- For simplicity sake, Coach model and Student model were condensed into a single model, with a field denoting what type of user they are.  In a more complicated application, where there might be more specific features depending on type of user, or if some more complex querying was going on (for efficiency sake), it would probably make more sense to have a specific model for each with a foreignKey to their User instance. 

# Improvements
- Have the FE pass a query param to the sessions endpoint to have different responses for upcoming vs previous sessions, this way the two can be separated on the FE (could live on different tabs for instance)
- Validation for POST requests (phone #s, time_slots, etc)
- Parse note coach leaves for malicious code and remove it
- Order timeslots by time in incrementing order, and display them by date 
- Change endpoints to only support specific methods (Should not be able to make a GET request on /api/time_slots for ex)
- add setup script to automate migration + db population + runserver (streamlines local development flow)
- add end_time field on the time_slot model so ambiguous logic like -timedelta(hours=2) is much clearer
- Ability to alter available timeslots (remove previous selected timeslots, change time)
- Ability to reschedule a coaching session
- Only return coaches with availability on the /coaches endpoint
- Use reactstrap for layout
- on sessions page, just show name for other party, and if you click on their name a phone number modal pops up 
- add feedback_left_by field on the CoachingSessionFeedback model to denote what user left feedback (also validation so only the coach can leave feedback)
- date_created field for sessions, feedback
- dropdown for rating for feedback form modal


# General Notes
- Things like max_length on CharFields is something that in a real world setting would be discussed with product, I'm just putting arbitrary values here to keep DB load in mind.
- Spent more time on the FE side of things because my React is very rusty (previous role was fully BE).  Would be able to get back up to speed relatively quickly, just went for functional requirements here FE wise.

# Assumptions
- If a student and a coach have already had a past session, they will forever have the ability to view eachother's phone #.
- Coaching sessions are auto-accepted once a student chooses an available timeslot.
- Assume once a session is created (slot is booked), that it happens (at scheduled time).  
- Assume entered phone numbers are valid (not going to add validation)

# Data Models
- User Model (can probably use django's built in User model)
    - extend this model for all user's instead of the below
    - phone#
    - timeslots m2m
    - user_type (coach or student)
    
~~- Coach Model (maybe have both be the same model but with a choice field for type?)~~
    ~~- timeslots m2m
    - user fk~~
~~- Student Model
    - user fk~~

- CoachingSession model
    - timeslot fk
    - coach fk
    - student fk 
- Time Slot model (default 2 hours long - cannot change)
    - time (datetimefield)
    - is_available (booleanfield)
- Feedback model
    - note (charfield)
    - rating (1-5)
    - session fk
    
# TODO LIST: 
- FE: 
    - All Coaches page DONE 
        - CTA on timeslot to create session DONE
    - Sessions page DONE
        - Modal for Leaving feedback DONE 
            - Satisfaction (state, will be a CTA if DNE)
            - Notes (state, will be a CTA if DNE)
        ~~- View Phone number modal~~ 
    - Choose timeslots page
        - https://react-day-time-picker.netlify.app/ (skipping for timesake)
    - Navigation DONE 
        - Coaches (maybe hide if on coach account - NICE TO HAVE) DONE
        - Sessions DONE
        - Choose timeslots (maybe hide if on student account - NICE TO HAVE) DONE
        
BE:
- Create Data Model DONE
- Create timeslot endpoint (POST) DONE
    - create url pattern
    - create viewset DONE 
    - create serializers DONE
- Create coaching session endpoints (GET (upcoming/previous separate)/POST(creation when booked)) DONE 
    - create url pattern DONE 
    - create viewset DONE 
        - GET upcoming/previous as query param mapping to different serializers DONE
        - POST (update timeslot to is_available = False upon creation) DONE 
    - create serializer DONE
- Create coach's endpoint (GET)
    - create url pattern DONE
    - create viewset DONE
    - create serializer DONE
- Create feedback endpoint (POST)
    - create url pattern DONE
    - create viewset DONE
    - create serializer DONE

- Docker setup DONE 
    - db (PostgreSQL) DONE
    - api (be) DONE 
    - web (fe)  DONE
