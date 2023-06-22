# movies_data = [
#     {
#         'title': 'The Shawshank Redemption',
#         'overview': 'Two imprisoned men bond over a number of years...',
#         'poster_path': 'shawshank_redemption.jpg'
#     },
#     {
#         'title': 'The Godfather',
#         'overview': 'The aging patriarch of an organized crime dynasty transfers...',
#         'poster_path': 'godfather.jpg'
#     },
#     ...
# ]

# users_data = [    {        'username': 'john_doe',        'email': 'john_doe@example.com',        'age': 25,        'gender': 'M'    },    {        'username': 'jane_doe',        'email': 'jane_doe@example.com',        'age': 30,        'gender': 'F'    },    ...]

# ratings_data = [    {        'user_id': 1,        'movie_id': 1,        'rating': 9.2    },    {        'user_id': 1,        'movie_id': 2,        'rating': 8.9    },    ...]

# load data into database
# for movie_data in movies_data:
#     Movie.objects.create(**movie_data)

# for user_data in users_data:
#     User.objects.create(**user_data)

# for rating_data in ratings_data:
#     user_id = rating_data.pop('user_id')
#     movie_id = rating_data.pop('movie_id')
#     Rating.objects.create(user_id=user_id, movie_id=movie_id, **rating_data)