
const BASE_URL = "https://mh1a8w0vs3.execute-api.us-east-1.amazonaws.com"

const init = async () => {
  console.log('Document loaded, adding page view...');
  addPageView();
  const count = await getPageViews();
  console.log('Page views fetched:', count);

  const $el = document.getElementById('page-views');
  if ($el) {
    $el.textContent = count;
  } else {
    console.error('Element with id "page-views" not found');
  }
}

const addPageView = async () => {
  try {
    const response = await fetch(`${BASE_URL}/page_views`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    console.log('Response status:', response.status);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Page view added:', data);
  } catch (error) {
    console.error('Error adding page view:', error);
  }
}

const getPageViews = async () => {
  try {
    const url = `${BASE_URL}/page_views`
    console.log('Fetching page views from:', url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain'
      },
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Page views:', data);
    console.log('data.pageViewsCount:', data.pageViewsCount);
    return data.pageViewsCount;
  } catch (error) {
    console.error('Error fetching page views:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  init();
})



