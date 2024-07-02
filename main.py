from flask import request, Flask, render_template, send_from_directory
import re, os



def is_phone_or_tablet(user_agent):
    # Regular expression patterns for common phone and tablet user agent strings
    phone_patterns = [
        r"Android",
        r"iPhone",
        r"Windows Phone",
        r"BlackBerry",
        r"Mobile"
    ]
    
    tablet_patterns = [
        r"iPad",
        r"Tablet",
        r"Kindle"
    ]
    
    for pattern in phone_patterns:
        if re.search(pattern, user_agent):
            return True, "Phone"
    
    for pattern in tablet_patterns:
        if re.search(pattern, user_agent):
            return True, "Tablet"
    
    return False, None


app = Flask(__name__)

@app.route('/')
def api_endpoint():
    user_agent = request.headers.get('User-Agent')
    comming_from_phone_or_tablet, if_so_type = is_phone_or_tablet(user_agent)
    if comming_from_phone_or_tablet:
        return f"this website cannot be viewed a on {if_so_type}"
    
    return render_template("index.html")


@app.route("/images/<str:image_name>")
def send_image(image_name):
    return send_from_directory(os.path.join("images", image_name))


if __name__ == "__main__":
    app.run()