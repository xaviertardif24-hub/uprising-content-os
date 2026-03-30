import asyncio
import os
import sys

# Add backend to sys.path for importing app modules
sys.path.append(os.path.join(os.path.dirname(__file__), "../backend"))

async def test_framer_sync():
    # Mocking the environment
    os.environ["FRAMER_API_TOKEN"] = "your_framer_token_here"
    os.environ["FRAMER_PROJECT_ID"] = "your_project_id_here"
    
    from app.services.framer_service import FramerService
    service = FramerService()
    
    # Test Data
    idea = {
        "title": "Ma nouvelle idée géniale",
        "description": "Ceci est une description détaillée de mon idée pour Olivier.",
        "score": 8.5
    }
    
    print("\n--- Test Synchronisation Framer 🚀 ---")
    print(f"Données source: {idea}")
    
    result = await service.sync_idea_to_framer(idea)
    
    print(f"\nStatut: {result['status']}")
    
    if result['status'] == 'mock_success':
        print("\n✅ Succès (Mode Simulation)")
        print("\nDonnées formatées selon le mapping :")
        fields = result['data']['fields']
        for k, v in fields.items():
            print(f"  - {k}: {v}")
    else:
        print(f"\n❌ Erreur: {result.get('message')}")

if __name__ == "__main__":
    asyncio.run(test_framer_sync())
