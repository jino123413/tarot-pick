"""
Generate 22 Major Arcana tarot card images using ComfyUI Flux Schnell GGUF.
Style: dark mystical tarot card art, burgundy background, gold accents.
Output: tarot-pick/public/cards/0.png ~ 21.png (384x576px)
"""

import urllib.request
import urllib.parse
import json
import time
import os
import shutil
from pathlib import Path

COMFYUI_URL = "http://127.0.0.1:8188"
OUTPUT_DIR = Path(r"C:\Users\USER-PC\Desktop\appintoss-project\tarot-pick\public\cards")
COMFYUI_OUTPUT = Path(r"C:\Users\USER-PC\Downloads\ComfyUI_windows_portable_nvidia\ComfyUI_windows_portable\ComfyUI\output")

# Card dimensions (2:3 ratio)
WIDTH = 768
HEIGHT = 1152
FINAL_WIDTH = 384
FINAL_HEIGHT = 576

STYLE_PREFIX = (
    "dark mystical tarot card illustration, art nouveau style, "
    "dark burgundy background color #1A0A14, gold ornate border frame, "
    "gold accent details #D4A574, occult symbols, mystical atmosphere, "
    "centered composition, detailed illustration, "
    "no text, no letters, no words, no writing"
)

STYLE_NEGATIVE = ""

# 22 Major Arcana card prompts
CARD_PROMPTS = {
    0: {
        "name": "The Fool",
        "clip_l": "tarot card, the fool, wanderer at cliff edge, white dog, sunrise, bundle on stick, golden sun",
        "t5xxl": f"{STYLE_PREFIX}, The Fool tarot card, a young wanderer standing at the edge of a cliff with a small white dog at their feet, carrying a bundle on a stick over their shoulder, bright golden sunrise behind them, mountains in the distance, butterflies and flowers around, carefree spirit, beginning of a journey, ornate gold art nouveau frame border"
    },
    1: {
        "name": "The Magician",
        "clip_l": "tarot card, the magician, infinity symbol, four elements, raised wand, table with tools",
        "t5xxl": f"{STYLE_PREFIX}, The Magician tarot card, a robed figure with an infinity symbol (lemniscate) floating above their head, one hand raised holding a wand pointing to the sky, the other hand pointing down, a table before them with a cup, pentacle, sword, and wand representing the four elements, roses and lilies, powerful magical aura"
    },
    2: {
        "name": "The High Priestess",
        "clip_l": "tarot card, high priestess, crescent moon, pomegranates, veil between pillars, scroll",
        "t5xxl": f"{STYLE_PREFIX}, The High Priestess tarot card, a serene woman seated between two pillars (one black one white), a crescent moon at her feet, a veil of pomegranates behind her, holding a scroll or book of wisdom, mysterious and intuitive atmosphere, deep blues and silver accents with gold border"
    },
    3: {
        "name": "The Empress",
        "clip_l": "tarot card, the empress, crown of twelve stars, wheat field, flowing dress, nature abundance",
        "t5xxl": f"{STYLE_PREFIX}, The Empress tarot card, a beautiful woman wearing a crown of twelve stars, seated on luxurious cushions in a lush wheat field, flowing elegant dress, surrounded by abundant nature and flowers, a heart-shaped shield with Venus symbol, fertility and abundance, warm golden tones"
    },
    4: {
        "name": "The Emperor",
        "clip_l": "tarot card, the emperor, stone throne, ram heads, orb and scepter, mountains, authority",
        "t5xxl": f"{STYLE_PREFIX}, The Emperor tarot card, a stern powerful figure seated on a massive stone throne decorated with four ram heads, holding an ankh scepter in one hand and an orb in the other, barren mountains behind, red robes, long white beard, authority and structure, strong masculine energy"
    },
    5: {
        "name": "The Hierophant",
        "clip_l": "tarot card, hierophant, triple crown, religious figure, two acolytes kneeling, crossed keys",
        "t5xxl": f"{STYLE_PREFIX}, The Hierophant tarot card, a religious figure wearing an elaborate triple crown, seated between two grey pillars, raising one hand in blessing, two acolytes kneeling before him, two crossed golden keys at his feet, sacred wisdom and tradition, cathedral-like setting"
    },
    6: {
        "name": "The Lovers",
        "clip_l": "tarot card, the lovers, angel above, two figures, tree of knowledge, apple, mountain",
        "t5xxl": f"{STYLE_PREFIX}, The Lovers tarot card, a large winged angel in the sky above two figures standing below, one near a tree with fruit (tree of knowledge) and the other near a tree of flames, a mountain peak between them, radiant sun behind the angel, love and choice, harmonious warm tones"
    },
    7: {
        "name": "The Chariot",
        "clip_l": "tarot card, the chariot, canopy of stars, two sphinxes, armor, city behind, victory",
        "t5xxl": f"{STYLE_PREFIX}, The Chariot tarot card, an armored warrior standing in a chariot beneath a canopy of stars, two sphinxes (one black one white) pulling the chariot, a walled city behind, crescent moons on shoulders, laurel and star crown, determination and willpower, triumphant pose"
    },
    8: {
        "name": "Strength",
        "clip_l": "tarot card, strength, woman gently holding lion's jaw, infinity symbol, flowers, gentle power",
        "t5xxl": f"{STYLE_PREFIX}, Strength tarot card, a gentle woman in white flowing robes calmly and lovingly holding open the jaw of a lion, an infinity symbol (lemniscate) above her head, surrounded by a garland of flowers, green landscape, inner courage and patience, soft but powerful energy"
    },
    9: {
        "name": "The Hermit",
        "clip_l": "tarot card, the hermit, lantern with star, mountain peak, staff, hooded figure, solitude",
        "t5xxl": f"{STYLE_PREFIX}, The Hermit tarot card, a solitary hooded figure standing atop a snowy mountain peak, holding a glowing lantern containing a six-pointed star in one hand and a tall staff in the other, deep contemplation, wisdom through solitude, dark blue and grey tones with golden lantern glow"
    },
    10: {
        "name": "Wheel of Fortune",
        "clip_l": "tarot card, wheel of fortune, large wheel with symbols, sphinx on top, creatures at corners, fate",
        "t5xxl": f"{STYLE_PREFIX}, Wheel of Fortune tarot card, a large golden wheel with alchemical symbols and letters TARO, a sphinx sitting on top, figures ascending and descending the wheel, four winged creatures in the corners (angel, eagle, lion, bull), clouds, destiny and cycles, intricate mechanical details"
    },
    11: {
        "name": "Justice",
        "clip_l": "tarot card, justice, scales in one hand, upright sword in other, throne, crown, red robe",
        "t5xxl": f"{STYLE_PREFIX}, Justice tarot card, a figure in red robes seated on a throne between two pillars, holding balanced golden scales in the left hand and an upright double-edged sword in the right hand, wearing a crown, purple veil behind, truth and fairness, symmetrical composition"
    },
    12: {
        "name": "The Hanged Man",
        "clip_l": "tarot card, hanged man, suspended upside down from tree, one leg crossed, halo, serene face",
        "t5xxl": f"{STYLE_PREFIX}, The Hanged Man tarot card, a figure suspended upside down from a living wooden T-shaped tree, hanging by one foot with the other leg crossed behind the knee forming a figure 4, a golden halo or nimbus around the head, serene peaceful expression, surrender and new perspective, soft mystical light"
    },
    13: {
        "name": "Death",
        "clip_l": "tarot card, death, skeleton knight on white horse, black armor, fallen figures, sunrise beyond",
        "t5xxl": f"{STYLE_PREFIX}, Death tarot card, a skeleton figure in black armor riding a pale white horse, carrying a black flag with a white rose, figures of all ages around (king fallen, child offering flowers, priest praying), a golden sunrise on the horizon between two towers, transformation and endings leading to new beginnings"
    },
    14: {
        "name": "Temperance",
        "clip_l": "tarot card, temperance, angel with wings, two cups pouring water, one foot in water, iris flowers",
        "t5xxl": f"{STYLE_PREFIX}, Temperance tarot card, a serene angel with large wings standing with one foot on land and one foot in a stream of water, carefully pouring liquid between two golden cups creating a flowing arc, a path leading to mountains with a golden crown of light, iris flowers growing nearby, balance and patience, soft ethereal atmosphere"
    },
    15: {
        "name": "The Devil",
        "clip_l": "tarot card, the devil, horned figure, chains, two chained figures, inverted pentagram, dark throne",
        "t5xxl": f"{STYLE_PREFIX}, The Devil tarot card, a large horned winged figure (baphomet-like) perched on a dark throne or pedestal, an inverted pentagram above, two smaller figures chained loosely to the pedestal below, bat wings, torch in one hand, a feeling of bondage and materialism, dark oppressive atmosphere with touches of fire"
    },
    16: {
        "name": "The Tower",
        "clip_l": "tarot card, the tower, lightning striking tower crown, figures falling, fire, dark storm clouds",
        "t5xxl": f"{STYLE_PREFIX}, The Tower tarot card, a tall stone tower on a rocky peak being struck by a bolt of lightning, the golden crown at the top being blown off, flames bursting from windows, two figures falling from the tower, dark storm clouds, 22 flames or sparks in the air, sudden upheaval and revelation, dramatic and intense"
    },
    17: {
        "name": "The Star",
        "clip_l": "tarot card, the star, woman pouring water, eight pointed stars, night sky, pool of water, hope",
        "t5xxl": f"{STYLE_PREFIX}, The Star tarot card, a figure kneeling by a pool of water under a vast starry night sky, pouring water from two vessels (one into the pool one onto the land), one large eight-pointed golden star above surrounded by seven smaller stars, a bird (ibis) in a tree, hope and renewal and inspiration, peaceful serene cosmic atmosphere"
    },
    18: {
        "name": "The Moon",
        "clip_l": "tarot card, the moon, full moon with face, two towers, wolf and dog, crayfish, winding path",
        "t5xxl": f"{STYLE_PREFIX}, The Moon tarot card, a large full moon with a contemplative face in the night sky, drops of light falling, two grey towers flanking a winding path, a wolf and a domesticated dog howling at the moon, a crayfish or lobster emerging from a pool of water, illusion and subconscious, dreamy eerie atmosphere"
    },
    19: {
        "name": "The Sun",
        "clip_l": "tarot card, the sun, radiant sun with face, child on white horse, sunflowers, stone wall, joy",
        "t5xxl": f"{STYLE_PREFIX}, The Sun tarot card, a brilliant radiant golden sun with a benevolent face shining in the sky, a joyful child riding a white horse with arms outstretched, tall sunflowers growing behind a low stone wall, red banner flowing, pure happiness and vitality and success, bright warm golden atmosphere"
    },
    20: {
        "name": "Judgement",
        "clip_l": "tarot card, judgement, angel with trumpet, people rising from coffins, mountains, clouds, rebirth",
        "t5xxl": f"{STYLE_PREFIX}, Judgement tarot card, a great angel (Gabriel) in the clouds blowing a golden trumpet with a banner, below people of all ages rising from open coffins or graves with arms raised in joy, mountains and water in the background, divine light streaming down, resurrection and absolution, grand dramatic celestial scene"
    },
    21: {
        "name": "The World",
        "clip_l": "tarot card, the world, dancing figure in wreath, four creatures in corners, completion, batons",
        "t5xxl": f"{STYLE_PREFIX}, The World tarot card, a graceful figure dancing within a large oval laurel wreath, holding a baton or wand in each hand, surrounded by four creatures in the corners (angel, eagle, lion, bull) each on a cloud, a sense of completion wholeness and accomplishment, cosmic and celebratory, the final triumphant card"
    },
}


def build_workflow(card_id: int, seed: int) -> dict:
    """Build ComfyUI API workflow for one tarot card."""
    prompt_data = CARD_PROMPTS[card_id]
    prefix = f"tarot_{card_id}"

    return {
        "prompt": {
            "1": {
                "class_type": "UnetLoaderGGUF",
                "inputs": {
                    "unet_name": "flux1-schnell-Q4_K_S.gguf"
                }
            },
            "2": {
                "class_type": "DualCLIPLoaderGGUF",
                "inputs": {
                    "clip_name1": "clip_l.safetensors",
                    "clip_name2": "t5-v1_1-xxl-encoder-Q4_K_M.gguf",
                    "type": "flux"
                }
            },
            "3": {
                "class_type": "CLIPTextEncodeFlux",
                "inputs": {
                    "clip": ["2", 0],
                    "clip_l": prompt_data["clip_l"],
                    "t5xxl": prompt_data["t5xxl"],
                    "guidance": 3.5
                }
            },
            "4": {
                "class_type": "CLIPTextEncodeFlux",
                "inputs": {
                    "clip": ["2", 0],
                    "clip_l": "",
                    "t5xxl": "",
                    "guidance": 3.5
                }
            },
            "5": {
                "class_type": "EmptySD3LatentImage",
                "inputs": {
                    "width": WIDTH,
                    "height": HEIGHT,
                    "batch_size": 1
                }
            },
            "6": {
                "class_type": "KSampler",
                "inputs": {
                    "model": ["1", 0],
                    "seed": seed,
                    "steps": 4,
                    "cfg": 1.0,
                    "sampler_name": "euler",
                    "scheduler": "simple",
                    "positive": ["3", 0],
                    "negative": ["4", 0],
                    "latent_image": ["5", 0],
                    "denoise": 1.0
                }
            },
            "7": {
                "class_type": "VAELoader",
                "inputs": {
                    "vae_name": "ae.safetensors"
                }
            },
            "8": {
                "class_type": "VAEDecode",
                "inputs": {
                    "samples": ["6", 0],
                    "vae": ["7", 0]
                }
            },
            "9": {
                "class_type": "SaveImage",
                "inputs": {
                    "images": ["8", 0],
                    "filename_prefix": prefix
                }
            }
        }
    }


def queue_prompt(workflow: dict) -> str:
    """Queue a prompt and return the prompt_id."""
    data = json.dumps(workflow).encode('utf-8')
    req = urllib.request.Request(
        f"{COMFYUI_URL}/prompt",
        data=data,
        headers={'Content-Type': 'application/json'}
    )
    resp = urllib.request.urlopen(req)
    result = json.loads(resp.read())
    return result['prompt_id']


def wait_for_completion(prompt_id: str, timeout: int = 600) -> dict:
    """Wait for a prompt to complete and return history."""
    start = time.time()
    while time.time() - start < timeout:
        try:
            resp = urllib.request.urlopen(f"{COMFYUI_URL}/history/{prompt_id}")
            history = json.loads(resp.read())
            if prompt_id in history:
                status = history[prompt_id].get('status', {})
                if status.get('completed', False) or status.get('status_str') == 'success':
                    return history[prompt_id]
                if status.get('status_str') == 'error':
                    print(f"  ERROR: {json.dumps(status, indent=2)[:500]}")
                    return None
        except Exception:
            pass
        time.sleep(3)
    print(f"  TIMEOUT after {timeout}s")
    return None


def find_output_file(prompt_id: str, history: dict) -> str:
    """Find the output filename from the history."""
    try:
        outputs = history.get('outputs', {})
        for node_id, node_out in outputs.items():
            if 'images' in node_out:
                for img in node_out['images']:
                    return img.get('filename', '')
    except Exception as e:
        print(f"  Error parsing output: {e}")
    return ''


def resize_image(src: str, dst: str, w: int, h: int):
    """Resize image using Python PIL if available, otherwise just copy."""
    try:
        from PIL import Image
        img = Image.open(src)
        img = img.resize((w, h), Image.LANCZOS)
        img.save(dst, 'PNG', optimize=True)
        return True
    except ImportError:
        # PIL not available, just copy the full-size image
        shutil.copy2(src, dst)
        return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"=" * 60)
    print(f"Generating 22 Major Arcana Tarot Cards via ComfyUI Flux")
    print(f"Resolution: {WIDTH}x{HEIGHT} → {FINAL_WIDTH}x{FINAL_HEIGHT}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"=" * 60)

    base_seed = 42000
    success_count = 0
    fail_count = 0

    for card_id in range(22):
        prompt_data = CARD_PROMPTS[card_id]
        seed = base_seed + card_id * 100
        print(f"\n[{card_id:2d}/21] {prompt_data['name']} (seed={seed})")

        # Build and queue workflow
        workflow = build_workflow(card_id, seed)
        try:
            prompt_id = queue_prompt(workflow)
            print(f"  Queued: {prompt_id}")
        except Exception as e:
            print(f"  FAILED to queue: {e}")
            fail_count += 1
            continue

        # Wait for completion
        history = wait_for_completion(prompt_id, timeout=300)
        if not history:
            fail_count += 1
            continue

        # Find output file
        filename = find_output_file(prompt_id, history)
        if not filename:
            print(f"  No output file found")
            fail_count += 1
            continue

        src_path = COMFYUI_OUTPUT / filename
        dst_path = OUTPUT_DIR / f"{card_id}.png"

        if not src_path.exists():
            # Try with subfolder
            for subdir in COMFYUI_OUTPUT.iterdir():
                candidate = subdir / filename
                if candidate.exists():
                    src_path = candidate
                    break

        if src_path.exists():
            resized = resize_image(str(src_path), str(dst_path), FINAL_WIDTH, FINAL_HEIGHT)
            size_kb = os.path.getsize(str(dst_path)) / 1024
            print(f"  Saved: {dst_path.name} ({size_kb:.0f}KB) {'(resized)' if resized else '(full-size copy)'}")
            success_count += 1
        else:
            print(f"  Output file not found: {src_path}")
            fail_count += 1

    print(f"\n{'=' * 60}")
    print(f"DONE: {success_count} succeeded, {fail_count} failed")
    total_size = sum(f.stat().st_size for f in OUTPUT_DIR.glob('*.png')) / 1024
    print(f"Total size: {total_size:.0f}KB")
    print(f"{'=' * 60}")


if __name__ == '__main__':
    main()
