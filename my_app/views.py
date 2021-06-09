import requests
from requests.compat import quote_plus
from django.shortcuts import render
from bs4 import BeautifulSoup
from . import models

BASE_PICKABOO_URL = 'https://chaldal.com/search/{}'
BASE_IMAGE_URL = 'https://www.pickaboo.com/skin/frontend/em0131/default/images/logo-pickaboo.png'


# Create your views here.
def home(request):
    return render(request, 'index.html')


def new_search(request):
    search = request.POST.get('search')
    models.Search.objects.create(search=search)
    final_url = BASE_PICKABOO_URL.format(quote_plus(search))
    response = requests.get(final_url)
    data = response.text
    soup = BeautifulSoup(data, features='html.parser')

    post_listings = soup.find_all('div', {'class': 'product'})

    final_postings = []

    for post in post_listings:
        post_titles = post.find(class_="name").text
        post_url = post.find('a').get('href')

        if post.find(class_="price"):
            post_price = post.find(class_="price").text
        else:
            post_price = 'N/A'

        if post.find(class_="imageWrapperWrapper").get('src'):
            post_image_id = post.find(class_="imageWrapperWrapper").get('src')
            post_image_url = BASE_IMAGE_URL.format(post_image_id)
            print(post_image_url)
        else:
            post_image_url = 'https://www.pickaboo.com/skin/frontend/em0131/default/images/logo-pickaboo.png'

        final_postings.append((post_titles, post_url, post_price, post_image_url))

    stuff_for_frontend = {
        'search': search,
        'final_postings': final_postings,

    }
    return render(request, 'Search.html', stuff_for_frontend)
