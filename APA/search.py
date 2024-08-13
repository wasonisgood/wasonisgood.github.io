import logging
import requests
from scholarly import scholarly
import json
import os

# Set up logging
logging.basicConfig(level=logging.INFO, filename='scholarly.log', filemode='a',
                    format='%(asctime)s - %(levelname)s - %(message)s')

# Mimic real user visit with HTTP headers
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def format_apa(entry):
    try:
        authors = ', '.join(entry['bib'].get('author', ['Unknown Author']))
        title = entry['bib'].get('title', 'No Title')
        journal = entry['bib'].get('venue', 'No Journal')
        year = entry['bib'].get('pub_year', 'n.d.')
        volume = entry['bib'].get('volume', '')
        issue = entry['bib'].get('number', '')
        pages = entry['bib'].get('pages', '')

        apa_format = f"{authors} ({year}). {title}. {journal}, {volume}({issue}), {pages}."
        return apa_format
    except Exception as e:
        logging.error(f"Error formatting APA: {e}")
        return "Error formatting entry."

def search_and_save(query_list, start_year=2000, end_year=2024, max_results=100):
    try:
        # Use requests to set headers for the search request
        scholarly.use_proxy(None, None)  # Ensure no proxy is used
        scholarly._SCHOLARLY_URL = "https://scholar.google.com/scholar"
        scholarly._SESSION = requests.Session()
        scholarly._SESSION.headers.update(headers)

        for query in query_list:
            search_query = scholarly.search_pubs(query, year_low=start_year, year_high=end_year)
            results = []
            json_results = []
            count = 0
            
            for entry in search_query:
                if count >= max_results:
                    break
                results.append(format_apa(entry))
                json_results.append(entry)
                count += 1

            # Create a directory for each query
            directory_name = f"results_{query.replace(' ', '_')}"
            os.makedirs(directory_name, exist_ok=True)

            # Save formatted APA references to a TXT file
            with open(os.path.join(directory_name, 'references.txt'), 'w', encoding='utf-8') as txt_file:
                for result in results:
                    txt_file.write(result + '\n')

            # Save raw JSON data to a JSON file
            with open(os.path.join(directory_name, 'references.json'), 'w', encoding='utf-8') as json_file:
                json.dump(json_results, json_file, indent=4, ensure_ascii=False)

            logging.info(f"Saved {count} results for query: {query}")
    except Exception as e:
        logging.error(f"Error during search and save: {e}")
        raise

if __name__ == "__main__":
    query_list = [
        "autonomous learning strategies",
        "self-directed learning in higher education",
        "autonomous learning and motivation",
        "technology-enhanced autonomous learning",
        "autonomous learning in language acquisition",
        "impact of self-regulated learning on academic performance",
        "autonomous learning environments",
        "role of metacognition in autonomous learning",
        "autonomous learning and digital literacy",
        "autonomous learning and lifelong learning skills"
    ]
    try:
        search_and_save(query_list)
    except Exception as e:
        logging.error(f"Failed to fetch results: {e}")
