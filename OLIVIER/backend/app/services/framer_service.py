import os
import json
import httpx
import logging
from typing import Any, Dict, Optional
from datetime import datetime

logger = logging.getLogger(__name__)

class FramerService:
    def __init__(self):
        self.api_token = os.getenv("FRAMER_API_TOKEN")
        self.project_id = os.getenv("FRAMER_PROJECT_ID")
        self.mapping_file = os.path.join(
            os.path.dirname(__file__), 
            "../../../docs/technical/field-mapping.json"
        )
        self.base_url = "https://api.framer.com/v1/cms"

    def _load_mapping(self) -> Dict:
        """Loads the field mapping from the shared documentation."""
        try:
            with open(self.mapping_file, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load field-mapping.json: {e}")
            return {}

    def _slugify(self, text: str) -> str:
        """Simple slugification logic."""
        return text.lower().replace(" ", "-").replace("'", "").replace("\"", "")

    async def sync_idea_to_framer(self, idea_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Synchronizes an idea from Content OS to Framer CMS.
        Follows the schema defined in field-mapping.json.
        """
        if not self.api_token:
            return {"status": "error", "message": "FRAMER_API_TOKEN not configured"}

        mapping_config = self._load_mapping()
        if not mapping_config:
            return {"status": "error", "message": "Mapping configuration missing"}

        # Find the "Blog" or "Projects" collection mapping (defaulting to blog-style for Ideas)
        blog_mapping = next((c for c in mapping_config.get("mapping", {}).get("collections", []) if c["name"] == "Blog"), None)
        
        if not blog_mapping:
            return {"status": "error", "message": "Blog collection mapping not found"}

        # Construct the Framer payload based on mapping
        framer_fields = {}
        for field_map in blog_mapping["fields"]:
            src = field_map["src"]
            dest = field_map["dest"]
            
            # Map values from idea_data to framer_fields
            if src == "title":
                framer_fields[dest] = idea_data.get("title")
            elif src == "slug":
                framer_fields[dest] = self._slugify(idea_data.get("title", ""))
            elif src == "createdAt":
                framer_fields[dest] = datetime.now().isoformat()
            elif src == "summary_text":
                framer_fields[dest] = idea_data.get("description", "")[:200]
            elif src == "html_content":
                # Convert description to basic HTML/RichText for Framer
                framer_fields[dest] = f"<p>{idea_data.get('description', '')}</p><p><strong>AI Score:</strong> {idea_data.get('score', 'N/A')}</p>"

        # API Call to Framer
        # Note: Real Framer API might require specific collection IDs
        payload = {
            "fields": framer_fields
        }

        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }

        try:
            async with httpx.AsyncClient() as client:
                # This is a placeholder for the actual Framer CMS API endpoint
                # In a real scenario, you'd POST to /projects/{project_id}/collections/{collection_id}/items
                response = await client.post(
                    f"{self.base_url}/sync_test", # Mocking sync for now
                    json=payload,
                    headers=headers,
                    timeout=10.0
                )
                
                # If we are in "Mock" mode (no token), we just log it
                if self.api_token == "your_framer_token_here":
                    logger.info(f"MOCK SYNC: Sent to Framer: {payload}")
                    return {"status": "mock_success", "data": payload}

                response.raise_for_status()
                return {"status": "success", "framer_id": response.json().get("id")}
        except Exception as e:
            logger.error(f"Framer Sync Error: {e}")
            return {"status": "error", "message": str(e), "data": payload}

framer_service = FramerService()
