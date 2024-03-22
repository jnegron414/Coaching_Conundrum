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


# TODO LIST: 
BE:
- Create Data Model
- Create timeslot endpoint (POST)
    - create url pattern
    - create viewset
    - create serializers
- Create coaching session endpoints (GET (upcoming/previous separate)/POST(creation when booked))
    - create url pattern
    - create viewset
        - GET upcoming/previous as query param mapping to different serializers
        - POST (update timeslot to is_available = False upon creation)
    - create serializer
- Create coach's endpoint (GET)
    - create url pattern
    - create viewset
    - create serializer
- Create feedback endpoint (POST)
    - create url pattern
    - create viewset
    - create serializer 
- All user's endpoint (for easy switching) (figure out best approach for this)

- Docker setup 
    - db (PostgreSQL)
    - web (be)
    - fe (?)

- FE: 
    - All Coaches page
    - Sessions page 
        - Upcoming 
        - Previous
            - Satisfaction (state, will be a CTA if DNE)
            - Notes (state, will be a CTA if DNE)
            - Other member
        - View Phone number modal
    - Choose timeslots page
    - Change current user modal 
    - Navigation
        - Coaches (maybe hide if on coach account - NICE TO HAVE)
        - Sessions
        - Choose timeslots (maybe hide if on student account - NICE TO HAVE)
        - Change user
        

# Installation Instructions
- TBD

# Trade-offs
- For simplicity sake, Coach model and Student model were condensed into a single model, with a field denoting what type of user they are.  In a more complicated application, where there might be more specific features depending on type of user, or if some more complex querying was going on (for efficiency sake), it would probably make more sense to have a specific model for each with a foreignKey to their User instance. 

# Assumptions
- If a student and a coach have already had a past session, they will forever have the ability to view eachother's phone #.
- Coaching sessions are auto-accepted once a student chooses an available timeslot.
- Assume once a session is created (slot is booked), that it happens (at scheduled time).  

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
