# AetherProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.910047Z
**Run ID**: RUN-062
**Seed**: 1700000062

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: adaptive

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 311ms
- Election Timeout Base: 461ms
- Election Timeout Range: 244ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- voting:flexible_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- log:hybrid
- log_structure:linked_list
- commit:pipeline_commit
- recovery:hybrid_recovery
- snapshot:adaptive
- dynamic_membership:add_node
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 52
- Elections Succeeded: 49
- Election Success Rate: 94.23%
- Messages Sent: 164
- Commits: 15
- Avg Messages/Commit: 10.93
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 58
- Elections Succeeded: 45
- Election Success Rate: 77.59%
- Messages Sent: 264
- Commits: 17
- Avg Messages/Commit: 15.53
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 46
- Election Success Rate: 90.20%
- Messages Sent: 408
- Commits: 21
- Avg Messages/Commit: 19.43
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 54
- Elections Succeeded: 54
- Election Success Rate: 100.00%
- Messages Sent: 618
- Commits: 39
- Avg Messages/Commit: 15.85
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

